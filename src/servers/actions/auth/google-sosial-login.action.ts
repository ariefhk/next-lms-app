"use server"

import { google } from "@/servers/utils/arctic"
import { generateCodeVerifier, generateState } from "arctic"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const googleSosialLoginAction = async (_formData: FormData) => {
  const codeVerifier = generateCodeVerifier()
  const state = generateState()

  const cookieStore = await cookies()
  cookieStore.set("code", codeVerifier)

  const url = google.createAuthorizationURL(state, codeVerifier, [
    "email",
    "profile",
  ])

  redirect(url.href)
}
