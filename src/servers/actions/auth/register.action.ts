"use server"

import { MailService } from "@/servers/services/mail.service"
import { UserService } from "@/servers/services/user.service"
import { VerificationCodeService } from "@/servers/services/verification-code.service"
import { actionOutput } from "@/servers/utils/action"
import { generateVerificationCode } from "@/servers/utils/generate-code"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
})

export const registerAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const validatedFields = registerSchema.safeParse({
    name,
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

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const createdUser = await UserService.register({
      name,
      email,
      password: passwordHash,
      isVerified: false,
      avatarUrl: "",
    })

    const createdVerificationCode = await VerificationCodeService.create({
      userId: createdUser.id,
      code: generateVerificationCode(),
    })

    await MailService.sendVerification({
      userId: createdUser.id,
      code: createdVerificationCode.code,
    })

    return actionOutput({
      status: "success",
      message: "Register successful, Please check your email!",
      data: null,
      errors: null,
    })
  } catch (error) {
    return actionOutput({
      status: "error",
      message: "Register failed, Please try again!",
      errors: error instanceof Error ? { message: error.message } : {},
      data: {
        name,
        email,
        password,
      },
    })
  }
}
