import React from "react";
import { Metadata } from "next";
import { requireAuth } from "@/features/auth/actions";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { getGithubInstallationStatus } from "@/features/github/server/installation";
import { GithubConnectCard } from "@/features/github/components/github-connect-card";

export const metadata: Metadata = {
  title: "Github App - Dashboard",
};

async function GithubDashboardPage() {
  const session = await requireAuth();
  const installation = await getGithubInstallationStatus(session.user.id)

  return (
    <>
      <DashboardHeader
        title="GitHub App"
        description="Install or disconnect the reviewer app on your GitHub account."
      />

    <GithubConnectCard userId={session.user.id} installation={installation}/>
      
    </>
  );
}

export default GithubDashboardPage;
