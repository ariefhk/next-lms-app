import slugify from "slugify"
import { CreateCourse } from "../models/course.model"
import prisma from "../utils/prisma"

export const CourseService = {
  async create(createCourseData: CreateCourse) {
    try {
      const slug = slugify(createCourseData.title, {
        lower: true,
      })
      const course = await prisma.course.create({
        data: {
          title: createCourseData.title,
          description: createCourseData.description,
          coverImage: createCourseData.coverImage,
          price: createCourseData.price,
          slug,
        },
      })

      return course
    } catch (_error) {
      console.error(_error)
      return null
    }
  },

  async getAll() {
    const courses = await prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
    })
    return courses
  },

  async getDetails(idOrSlug: string) {
    const course = await prisma.course.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        courseSections: {
          orderBy: {
            order: "asc",
          },
          include: {
            courseSectionLessons: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    })
    return course
  },
}
