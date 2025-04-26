"use server"

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
    return {
      error: "error",
      errorFields: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields",
      data: {
        email,
        password,
      },
    }
  }

  return {
    status: "success",
    message: "Login successful",
    data: {
      email,
    },
  }
}
