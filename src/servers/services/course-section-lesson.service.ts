import slugify from "slugify"
import { CreateCourseSectionLesson } from "../models/course-section-lesson.model"
import prisma from "../utils/prisma"

export const CourseSectionLessonService = {
  create: async (createCourseSectionLesson: CreateCourseSectionLesson) => {
    const findLastCourseSectionLesson =
      await prisma.courseSectionLesson.findFirst({
        where: {
          courseSectionId: createCourseSectionLesson.courseSectionId,
        },
        orderBy: {
          order: "desc",
        },
      })

    const order = findLastCourseSectionLesson
      ? findLastCourseSectionLesson.order + 1
      : 0

    const title = `Lesson ${order + 1}`

    const courseSectionLesson = await prisma.courseSectionLesson.create({
      data: {
        title,
        slug: slugify(title, { lower: true }),
        courseSectionId: createCourseSectionLesson.courseSectionId,
        isPreview: false,
        videoUrl: "-",
        order,
      },
    })

    return courseSectionLesson
  },
}
