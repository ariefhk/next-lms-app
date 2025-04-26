"use server"

import { MailService } from "@/servers/services/mail.service"
import { UserService } from "@/servers/services/user.service"
import { VerificationCodeService } from "@/servers/services/verification-code.service"
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
    return {
      status: "error",
      message: "Invalid fields",
      errorFields: validatedFields.error.flatten().fieldErrors,
      errors: null,
      data: {
        name,
        email,
        password,
      },
    }
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const createdUser = await UserService.register({
      name,
      email,
      password: passwordHash,
    })

    const createdVerificationCode = await VerificationCodeService.create({
      userId: createdUser.id,
      code: generateVerificationCode(),
    })

    await MailService.sendVerification({
      userId: createdUser.id,
      code: createdVerificationCode.code,
    })

    return {
      status: "success",
      message: "Register successful!",
      data: null,
    }
  } catch (error) {
    return {
      status: "error",
      message: "Register failed!",
      errorFields: null,
      errors: error,
      data: {
        name,
        email,
        password,
      },
    }
  }
}
