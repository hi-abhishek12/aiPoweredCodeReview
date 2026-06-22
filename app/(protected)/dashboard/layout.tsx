import React, { ReactNode } from "react";
import { requireAuth } from "@/features/auth/actions";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireAuth();
  return (
    <DashboardShell user={session.user} plan="pro">
      {children}
    </DashboardShell>
  );
}

export default DashboardLayout;
