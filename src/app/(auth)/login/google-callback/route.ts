import { UserService } from "@/servers/services/user.service"
import { VerificationCodeService } from "@/servers/services/verification-code.service"
import { google } from "@/servers/utils/arctic"
import { generateVerificationCode } from "@/servers/utils/generate-code"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

const googleCallbackSchema = z.object({
  code: z.string(),
  state: z.string(),
  codeVerifier: z.string(),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  // check if code and state are valid
  const cookieStore = await cookies()
  const codeCookie = cookieStore.get("code")

  const validation = googleCallbackSchema.safeParse({
    code,
    state,
    codeVerifier: codeCookie?.value,
  })

  if (!validation.success) {
    return redirect("/login")
  }

  const validatedGoogleAcc = await google.validateAuthorizationCode(
    validation.data.code,
    validation.data.codeVerifier,
  )

  if (!validatedGoogleAcc) return redirect("/login")

  const userGoogleValidation = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${validatedGoogleAcc.accessToken()}`,
      },
    },
  )
    .then(async (res) => {
      if (!res.ok) {
        console.log("Google API error: ", res.statusText)
        return null
      }
      return res.json()
    })
    .catch((err) => {
      console.error("Failed to fetch google user info: ", err)
      return null
    })

  if (!userGoogleValidation) return redirect("/login")

  const findUser = await UserService.findUser(userGoogleValidation.email)

  if (!findUser) {
    const createdUser = await UserService.register({
      name: userGoogleValidation.name,
      email: userGoogleValidation.email,
      password: "",
      avatarUrl: userGoogleValidation.picture,
      isVerified: true,
    })

    await VerificationCodeService.create({
      userId: createdUser.id,
      code: generateVerificationCode(),
    })

    const jwtPayload = {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
      avatarUrl: createdUser.avatarUrl,
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string)

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })

    return redirect("/my-courses")
  }

  await VerificationCodeService.create({
    userId: findUser.id,
    code: generateVerificationCode(),
  })

  const jwtPayload = {
    id: findUser.id,
    email: findUser.email,
    name: findUser.name,
    role: findUser.role,
    avatarUrl: findUser.avatarUrl,
  }
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string)

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  return redirect("/my-courses")
}
