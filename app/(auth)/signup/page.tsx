import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Start your 14-day free trial — no credit card needed.",
};

export default function SignupPage() {
  return <SignupForm />;
}
