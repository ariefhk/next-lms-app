"use server"

import { CourseService } from "@/servers/services/course.service"
import { actionOutput } from "@/servers/utils/action"
import { uploadFile } from "@/servers/utils/aws"
import { redirect } from "next/navigation"
import { z } from "zod"

const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.instanceof(File),
  price: z.number().min(0),
})

export const createCourseAction = async (_: unknown, formData: FormData) => {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const coverImage = formData.get("coverImage") as File
  const price = formData.get("price") ? Number(formData.get("price")) : 0

  const validation = createCourseSchema.safeParse({
    title,
    description,
    coverImage,
    price,
  })

  if (!validation.success) {
    return actionOutput({
      status: "error",
      message: "Invalid form fields!",
      errors: {
        errorFields: validation.error.flatten().fieldErrors,
      },
      data: {
        title,
        description,
        coverImage,
        price,
      },
    })
  }

  const newCourse = await CourseService.create({
    title: validation.data.title,
    description: validation.data.description,
    coverImage: validation.data.coverImage.name,
    price: validation.data.price,
  })

  if (!newCourse) {
    return actionOutput({
      status: "error",
      message: "Failed to create course",
      data: {
        title,
        description,
        coverImage,
        price,
      },
    })
  }

  await uploadFile({
    key: newCourse.coverImage,
    folder: `courses/${newCourse.id}`,
    body: validation.data.coverImage,
  })

  redirect(`/admin/courses/${newCourse.slug}`)
}
