"use server"

import { actionOutput } from "@/servers/utils/action"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const deleteCourseSectionSchema = z.object({
  courseSectionId: z.string(),
})

export const deleteCourseSection = async (_: unknown, formData: FormData) => {
  const courseSectionId = formData.get("courseSectionId") as string

  const validation = deleteCourseSectionSchema.safeParse({
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

  revalidatePath(`/admin/courses/[slug]`, "page")
}
