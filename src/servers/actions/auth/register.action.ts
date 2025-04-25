"use server"

export const registerAction = async (
  prevState: unknown,
  formData: FormData,
) => {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log({ name, email, password })

  return {
    status: "success",
    message: "Register successful",
    data: {
      name,
      email,
    },
  }
}
