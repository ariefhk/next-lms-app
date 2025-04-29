import { CourseSectionLesson } from "../db/generated-prisma"

export type CreateCourseSectionLesson = Pick<
  CourseSectionLesson,
  "courseSectionId"
>
