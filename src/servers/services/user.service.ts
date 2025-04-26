import { CreateUser, VerifyUser } from "../models/user.model"
import prisma from "../utils/prisma"

export const UserService = {
  async register(user: CreateUser) {
    const result = await prisma.user.create({
      data: user,
    })

    return result
  },

  async findUser(idOrEmail: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    })

    return user
  },

  async verifyUser(verifyUser: VerifyUser) {
    const unverifiedUser = await prisma.user.findFirst({
      where: {
        AND: [
          {
            id: verifyUser.userId,
          },
          {
            isVerified: false,
          },
          {
            verificationCode: {
              code: verifyUser.code,
            },
          },
        ],
      },
    })

    if (!unverifiedUser) {
      return false
    }

    await prisma.user.update({
      where: {
        id: verifyUser.userId,
      },
      data: {
        isVerified: true,
      },
    })

    return true
  },
}
