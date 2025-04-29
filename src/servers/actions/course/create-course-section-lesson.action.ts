"use server"

import { CourseSectionLessonService } from "@/servers/services/course-section-lesson.service"
import { actionOutput } from "@/servers/utils/action"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createCourseSectionLessonSchema = z.object({
  courseSectionId: z.string(),
})

export const createCourseSectionLesson = async (
  _: unknown,
  formData: FormData,
) => {
  const courseSectionId = formData.get("courseSectionId") as string

  const validation = createCourseSectionLessonSchema.safeParse({
    courseSectionId,
  })

  if (!validation.success) {
    return actionOutput({
      status: "error",
      message: "Invalid form fields!",
      errors: {
        errorFields: validation.error.flatten().fieldErrors,
      },
      data: {
        courseSectionId,
      },
    })
  }

  await CourseSectionLessonService.create({
    courseSectionId: validation.data.courseSectionId,
  })

  revalidatePath(`/admin/courses/[slug]`, "page")
}
