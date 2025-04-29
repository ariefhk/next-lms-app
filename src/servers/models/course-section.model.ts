import { CourseSection } from "../db/generated-prisma/client"

export type CreateCourseSection = Pick<
  CourseSection,
  "courseId" | "title" | "order"
>
