"use server"

import { getCurrentUserSession } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { deleteInstallation } from "../server/installation";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";


export async function disconnectGithubApp() {
    const session = await getCurrentUserSession();
  
    if (!session) {
      redirect("/sign-in");
    }
  
    await deleteInstallation(session.user.id);
    redirect(DASHBOARD_ROUTES.github);
  }