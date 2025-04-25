"use server"

export const loginAction = async (prevState: unknown, formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log({ email, password })

  return {
    status: "success",
    message: "Login successful",
    data: {
      email,
    },
  }
}
