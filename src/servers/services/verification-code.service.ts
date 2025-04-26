import { CreateVerificationCode } from "../models/verification-code.model"
import prisma from "../utils/prisma"

export const VerificationCodeService = {
  async create(createVerificationCode: CreateVerificationCode) {
    const verificationCode = await prisma.verificationCode.create({
      data: {
        userId: createVerificationCode.userId,
        code: createVerificationCode.code,
      },
    })

    return verificationCode
  },
}
