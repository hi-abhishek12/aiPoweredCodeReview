"use server"

import { headers } from "next/headers"; 
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {DEFAULT_AUTH_CALLBACK , SIGN_IN_PATH, sanitizeCallbackUrl} from "../utils"

export async function signInWithGithub(formdata :FormData){
    const callbackUrl = formdata.get("callbackUrl");

    const redirectTo = sanitizeCallbackUrl(typeof(callbackUrl) === 'string' ? callbackUrl : undefined)

    const result = await auth.api.signInSocial({
        body : {
            provider : 'github',
            callbackURL : redirectTo
        },

        headers : await headers()
    })

    if(result.url){
        redirect(result.url);
    }

}

export async function getCurrentUserSession() {
    return auth.api.getSession({
        headers : await headers(),
    });
}

export async function requireAuth(redirectTo = SIGN_IN_PATH) {
    const session = await getCurrentUserSession();
    console.log(`session`,session)

    if(!session){
        redirect(redirectTo);
    }

    return session

}

export async function noRequireAuth(redirectTo = DEFAULT_AUTH_CALLBACK) {
    const session = await getCurrentUserSession();

    if(session){
        redirect(redirectTo);
    }

}



