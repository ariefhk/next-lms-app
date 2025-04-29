"use server"

import { actionOutput } from "@/servers/utils/action"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const deleteCourseSectionLessonSchema = z.object({
  courseSectionLessonId: z.string(),
})

export const deleteCourseSectionLesson = async (
  _: unknown,
  formData: FormData,
) => {
  const courseSectionLessonId = formData.get("courseSectionLessonId") as string

  const validation = deleteCourseSectionLessonSchema.safeParse({
    courseSectionLessonId,
  })

  if (!validation.success) {
    return actionOutput({
      status: "error",
      message: "Invalid form fields!",
      errors: {
        errorFields: validation.error.flatten().fieldErrors,
      },
      data: {
        courseSectionLessonId,
      },
    })
  }

  revalidatePath(`/admin/courses/[slug]`, "page")
}
