-- =============================================================================
-- Pulse Analytics — Seed data (development only)
-- Run after schema.sql, and only after you have at least one user in auth.users
-- =============================================================================

do $$
declare
  uid uuid;
  ws  uuid;
begin
  -- Use the first auth user; bail out if none exists
  select id into uid from auth.users order by created_at limit 1;
  if uid is null then
    raise notice 'No auth user found — sign up first, then re-run seed.sql';
    return;
  end if;

  -- Workspace already auto-created by trigger; reuse it
  select id into ws from public.workspaces where owner_id = uid limit 1;
  if ws is null then
    raise notice 'No workspace found for user %', uid;
    return;
  end if;

  -- Data sources
  insert into public.data_sources (workspace_id, type, name, status, last_sync_at, created_by)
  values
    (ws, 'stripe', 'Stripe (Live)',           'connected', now() - interval '2 minutes', uid),
    (ws, 'ga4',    'Google Analytics 4',      'connected', now() - interval '5 minutes', uid),
    (ws, 'postgres','Production PostgreSQL',  'pending',   null,                          uid)
  on conflict do nothing;

  -- Reports
  insert into public.reports (workspace_id, name, description, schedule_cron, recipients, status, last_run_at, created_by)
  values
    (ws, 'Weekly Revenue Report', 'Revenue, MRR growth, top channels',     '0 9 * * 1', array['team@acme.com'],            'active', now() - interval '2 days', uid),
    (ws, 'Monthly Cohort Analysis','Retention by signup month',            '0 9 1 * *', array['ceo@acme.com','cfo@acme.com'],'active', now() - interval '7 days', uid),
    (ws, 'Churn Risk Alert',      'Accounts predicted to cancel <14 days', '0 7 * * *', array['cs@acme.com'],              'paused', now() - interval '1 day',  uid)
  on conflict do nothing;

  -- Alert rules
  insert into public.alert_rules (workspace_id, name, metric, operator, threshold, channel, severity, created_by)
  values
    (ws, 'Daily revenue drop',   'revenue.daily',  '<', 5000, 'slack:growth-alerts',  'high', uid),
    (ws, 'Conversion improvement','conversion.wow','>', 10,   'email:ceo@acme.com',   'info', uid)
  on conflict do nothing;
end $$;
