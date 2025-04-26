import { customAlphabet } from "nanoid"

export const generateVerificationCode = () => {
  const code = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6)

  return code()
}
