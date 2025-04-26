"use server"

import { VerifyUser } from "@/servers/models/user.model"
import { UserService } from "@/servers/services/user.service"

export const verifyUserAction = async (verifyUser: VerifyUser) => {
  try {
    const verify = await UserService.verifyUser(verifyUser)

    if (!verify) {
      return {
        status: "error",
        message: "user or code invalid",
      }
    }
    return {
      status: "success",
      message: "user verified, please login",
    }
  } catch (error) {
    return {
      status: "error",
      message: "user or code invalid",
      errors: error,
    }
  }
}
