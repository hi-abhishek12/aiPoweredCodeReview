import { getCurrentUserSession } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { saveGithubInstallation } from "@/features/github/server/installation";

function buildSignInCallbackUrl(installationId: string | null): string {
    if (installationId) {
      return `/api/github/callback?installation_id=${installationId}`;
    }
  
    return DASHBOARD_ROUTES.github;
  }

export async function GET(request: Request) {

    const {searchParams} = new URL(request.url);

    const  installationId = searchParams.get("installation_id");
    const session = await getCurrentUserSession();


    if(!session){
        const callbackUrl = buildSignInCallbackUrl(installationId);
        redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`); 
    }

    if(installationId){
        await saveGithubInstallation(session.user.id , Number(installationId))
    }

    redirect(DASHBOARD_ROUTES.github)
}
