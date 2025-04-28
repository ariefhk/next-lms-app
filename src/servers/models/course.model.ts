import { Course } from "../db/generated-prisma/client"

export type CreateCourse = Pick<
  Course,
  "title" | "description" | "coverImage" | "price"
>
