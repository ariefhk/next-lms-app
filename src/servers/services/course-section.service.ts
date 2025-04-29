import { CreateCourseSection } from "../models/course-section.model"
import prisma from "../utils/prisma"

export const CourseSectionService = {
  create: async (createCourseSection: CreateCourseSection) => {
    const findLastCourseSection = await prisma.courseSection.findFirst({
      where: {
        courseId: createCourseSection.courseId,
      },
      orderBy: {
        order: "desc",
      },
    })

    const order = findLastCourseSection ? findLastCourseSection.order + 1 : 0

    const courseSection = await prisma.courseSection.create({
      data: {
        ...createCourseSection,
        order,
      },
    })

    return courseSection
  },
}
