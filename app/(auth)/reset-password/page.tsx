import type { Metadata } from "next";
import { ResetForm } from "@/components/auth/reset-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "We'll email you a secure link to reset your password.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return <ResetForm />;
}
