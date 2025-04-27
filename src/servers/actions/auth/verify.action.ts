"use server"

import { VerifyUser } from "@/servers/models/user.model"
import { UserService } from "@/servers/services/user.service"

export const verifyUserAction = async (verifyUser: VerifyUser) => {
  try {
    const verify = await UserService.verifyUser(verifyUser)

    if (!verify) {
      return {
        status: "error",
        message: "Invalid user or code!",
      }
    }
    return {
      status: "success",
      message: "User verified, Please login!",
    }
  } catch (error) {
    return {
      status: "error",
      message: "Invalid user or code!",
      errors: error,
    }
  }
}
