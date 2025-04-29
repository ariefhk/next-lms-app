"use server"

import { CourseSectionService } from "@/servers/services/course-section.service"
import { actionOutput } from "@/servers/utils/action"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createCourseSectionSchema = z.object({
  courseId: z.string(),
})

export const createCourseSection = async (_: unknown, formData: FormData) => {
  const courseId = formData.get("courseId") as string
  const validation = createCourseSectionSchema.safeParse({ courseId })

  if (!validation.success) {
    return actionOutput({
      status: "error",
      message: "Invalid form fields!",
      errors: {
        errorFields: validation.error.flatten().fieldErrors,
      },
      data: {
        courseId,
      },
    })
  }

  await CourseSectionService.create({
    courseId: validation.data.courseId,
    title: "New Section",
    order: 0,
  })

  revalidatePath(`/admin/courses/[slug]`, "page")
}
