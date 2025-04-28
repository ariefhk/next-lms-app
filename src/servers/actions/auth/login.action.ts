"use server"

import { UserService } from "@/servers/services/user.service"
import { actionOutput } from "@/servers/utils/action"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
})

export const loginAction = async (prevState: unknown, formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const validatedFields = loginSchema.safeParse({
    email,
    password,
  })

  if (!validatedFields.success) {
    return actionOutput({
      status: "error",
      message: "Invalid form fields!",
      errors: {
        errorFields: validatedFields.error.flatten().fieldErrors,
      },
      data: {
        email,
        password,
      },
    })
  }

  const user = await UserService.findUser(email)

  if (!user || !user.password) {
    return actionOutput({
      status: "error",
      message: "User not found!",
      errors: null,
      data: {
        email,
        password,
      },
    })
  }

  if (!user?.isVerified) {
    return actionOutput({
      status: "error",
      message: "User not verified, Please check your email!",
      errors: null,
      data: {
        email,
        password,
      },
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return actionOutput({
      status: "error",
      message: "Invalid credentials!",
      errors: null,
      data: {
        email,
        password,
      },
    })
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatarUrl: user.avatarUrl,
  }
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string)

  const cookieStore = await cookies()

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  redirect("/dashboard/my-courses")
}
