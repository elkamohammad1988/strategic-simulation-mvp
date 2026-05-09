-- =============================================================================
-- Pulse Analytics — Supabase schema
-- Copy/paste this into Supabase SQL Editor (Project → SQL Editor → New Query)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. WORKSPACES (multi-tenant)
-- -----------------------------------------------------------------------------
create table if not exists public.workspaces (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  region      text not null default 'eu' check (region in ('us', 'eu', 'apac')),
  plan        text not null default 'starter' check (plan in ('starter', 'pro', 'enterprise')),
  owner_id    uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists workspaces_owner_idx on public.workspaces(owner_id);

-- -----------------------------------------------------------------------------
-- 2. WORKSPACE MEMBERS (RBAC)
-- -----------------------------------------------------------------------------
create table if not exists public.workspace_members (
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  role          text not null default 'viewer' check (role in ('owner', 'admin', 'editor', 'viewer')),
  joined_at     timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create index if not exists workspace_members_user_idx on public.workspace_members(user_id);

-- helper: is user a member of workspace?
create or replace function public.is_workspace_member(ws uuid, uid uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws and user_id = uid
  );
$$;

-- -----------------------------------------------------------------------------
-- 3. DATA SOURCES (connectors)
-- -----------------------------------------------------------------------------
create table if not exists public.data_sources (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  type          text not null check (type in ('stripe','postgres','ga4','shopify','hubspot','mixpanel','csv','webhook')),
  name          text not null,
  status        text not null default 'pending' check (status in ('pending','connected','error','paused')),
  config        jsonb not null default '{}'::jsonb,
  last_sync_at  timestamptz,
  created_by    uuid not null references auth.users(id),
  created_at    timestamptz not null default now()
);

create index if not exists data_sources_workspace_idx on public.data_sources(workspace_id);

-- -----------------------------------------------------------------------------
-- 4. CSV UPLOADS (file metadata; binary lives in storage bucket)
-- -----------------------------------------------------------------------------
create table if not exists public.csv_uploads (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  storage_path  text not null,
  filename      text not null,
  size_bytes    bigint not null,
  rows          int,
  columns       text[],
  uploaded_by   uuid not null references auth.users(id),
  uploaded_at   timestamptz not null default now()
);

create index if not exists csv_uploads_workspace_idx on public.csv_uploads(workspace_id);

-- -----------------------------------------------------------------------------
-- 5. REPORTS (scheduled deliveries)
-- -----------------------------------------------------------------------------
create table if not exists public.reports (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  name          text not null,
  description   text,
  schedule_cron text not null,
  recipients    text[] not null default '{}',
  status        text not null default 'active' check (status in ('active', 'paused')),
  last_run_at   timestamptz,
  created_by    uuid not null references auth.users(id),
  created_at    timestamptz not null default now()
);

create index if not exists reports_workspace_idx on public.reports(workspace_id);

-- -----------------------------------------------------------------------------
-- 6. ALERT RULES + EVENTS
-- -----------------------------------------------------------------------------
create table if not exists public.alert_rules (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  name          text not null,
  metric        text not null,
  operator      text not null check (operator in ('>', '<', '>=', '<=', '=', '!=')),
  threshold     numeric not null,
  channel       text not null,
  severity      text not null default 'info' check (severity in ('info','low','medium','high','critical')),
  enabled       boolean not null default true,
  created_by    uuid not null references auth.users(id),
  created_at    timestamptz not null default now()
);

create table if not exists public.alert_events (
  id            uuid primary key default gen_random_uuid(),
  rule_id       uuid not null references public.alert_rules(id) on delete cascade,
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  triggered_at  timestamptz not null default now(),
  resolved_at   timestamptz,
  payload       jsonb not null default '{}'::jsonb
);

create index if not exists alert_rules_workspace_idx on public.alert_rules(workspace_id);
create index if not exists alert_events_workspace_idx on public.alert_events(workspace_id);
create index if not exists alert_events_rule_idx on public.alert_events(rule_id);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

alter table public.workspaces        enable row level security;
alter table public.workspace_members enable row level security;
alter table public.data_sources      enable row level security;
alter table public.csv_uploads       enable row level security;
alter table public.reports           enable row level security;
alter table public.alert_rules       enable row level security;
alter table public.alert_events      enable row level security;

-- ---- workspaces: members can read; owner can update/delete; auth user can insert their own
drop policy if exists "members can read workspace" on public.workspaces;
create policy "members can read workspace"
  on public.workspaces for select
  using (public.is_workspace_member(id, auth.uid()));

drop policy if exists "owner can update workspace" on public.workspaces;
create policy "owner can update workspace"
  on public.workspaces for update
  using (owner_id = auth.uid());

drop policy if exists "owner can delete workspace" on public.workspaces;
create policy "owner can delete workspace"
  on public.workspaces for delete
  using (owner_id = auth.uid());

drop policy if exists "auth user can create workspace" on public.workspaces;
create policy "auth user can create workspace"
  on public.workspaces for insert
  with check (owner_id = auth.uid());

-- ---- workspace_members: members can read; owner/admin can write
drop policy if exists "members can read membership" on public.workspace_members;
create policy "members can read membership"
  on public.workspace_members for select
  using (public.is_workspace_member(workspace_id, auth.uid()));

drop policy if exists "owner/admin can manage members" on public.workspace_members;
create policy "owner/admin can manage members"
  on public.workspace_members for all
  using (
    exists (
      select 1 from public.workspace_members m
      where m.workspace_id = workspace_id
        and m.user_id = auth.uid()
        and m.role in ('owner', 'admin')
    )
  );

-- ---- data_sources / csv_uploads / reports / alert_rules / alert_events: any member can read; editors+ can write
do $$
declare
  t text;
begin
  for t in
    select unnest(array['data_sources','csv_uploads','reports','alert_rules','alert_events'])
  loop
    execute format('drop policy if exists "members can read %1$s" on public.%1$s;', t);
    execute format(
      'create policy "members can read %1$s" on public.%1$s for select using (public.is_workspace_member(workspace_id, auth.uid()));',
      t
    );

    execute format('drop policy if exists "editors can insert %1$s" on public.%1$s;', t);
    execute format(
      'create policy "editors can insert %1$s" on public.%1$s for insert with check (
        exists (
          select 1 from public.workspace_members m
          where m.workspace_id = %1$s.workspace_id
            and m.user_id = auth.uid()
            and m.role in (''owner'',''admin'',''editor'')
        )
      );',
      t
    );

    execute format('drop policy if exists "editors can update %1$s" on public.%1$s;', t);
    execute format(
      'create policy "editors can update %1$s" on public.%1$s for update using (
        exists (
          select 1 from public.workspace_members m
          where m.workspace_id = %1$s.workspace_id
            and m.user_id = auth.uid()
            and m.role in (''owner'',''admin'',''editor'')
        )
      );',
      t
    );

    execute format('drop policy if exists "editors can delete %1$s" on public.%1$s;', t);
    execute format(
      'create policy "editors can delete %1$s" on public.%1$s for delete using (
        exists (
          select 1 from public.workspace_members m
          where m.workspace_id = %1$s.workspace_id
            and m.user_id = auth.uid()
            and m.role in (''owner'',''admin'',''editor'')
        )
      );',
      t
    );
  end loop;
end $$;

-- =============================================================================
-- AUTO-CREATE WORKSPACE ON SIGNUP
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ws_id uuid;
  ws_slug text;
begin
  ws_slug := lower(regexp_replace(coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), '\s+', '-', 'g'));
  ws_slug := ws_slug || '-' || substr(new.id::text, 1, 6);

  insert into public.workspaces (name, slug, owner_id)
  values (
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)) || '''s workspace',
    ws_slug,
    new.id
  )
  returning id into ws_id;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (ws_id, new.id, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- STORAGE BUCKETS
-- =============================================================================
insert into storage.buckets (id, name, public)
values
  ('csv-uploads', 'csv-uploads', false),
  ('avatars',     'avatars',     true)
on conflict (id) do nothing;

-- avatars: anyone can read, only owner can upload to their own folder
drop policy if exists "avatars are publicly readable" on storage.objects;
create policy "avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "users can upload their own avatar" on storage.objects;
create policy "users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "users can update their own avatar" on storage.objects;
create policy "users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- csv-uploads: only members of the workspace folder can read/write
drop policy if exists "members can read csv files" on storage.objects;
create policy "members can read csv files"
  on storage.objects for select
  using (
    bucket_id = 'csv-uploads'
    and public.is_workspace_member(((storage.foldername(name))[1])::uuid, auth.uid())
  );

drop policy if exists "members can upload csv files" on storage.objects;
create policy "members can upload csv files"
  on storage.objects for insert
  with check (
    bucket_id = 'csv-uploads'
    and public.is_workspace_member(((storage.foldername(name))[1])::uuid, auth.uid())
  );
