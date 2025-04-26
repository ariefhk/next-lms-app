import { User } from "../db/generated-prisma/client"

export type CreateUser = Pick<User, "name" | "email" | "password">

export type LoginUser = Pick<User, "email" | "password">

export type VerifyUser = {
  userId: string
  code: string
}
