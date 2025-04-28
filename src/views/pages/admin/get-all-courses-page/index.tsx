import { CourseService } from "@/servers/services/course.service"
import Button from "@/views/components/ui/button"
import { getCourseCoverImageUrl } from "@/views/utils/url"
import Image from "next/image"
import Link from "next/link"

const GetAppCoursesPage = async () => {
  const courses = await CourseService.getAll()

  console.log(courses)

  return (
    <main className="space-y-8">
      <section className="flex items-center justify-between">
        <h3>Courses</h3>
        <Button className="w-fit" size="sm">
          Create Course
        </Button>
      </section>
      <section className="grid grid-cols-4 gap-6">
        {courses.length > 0
          ? courses.map((course) => (
              <div
                key={course.id}
                className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <Image
                  src={getCourseCoverImageUrl(course.id, course.coverImage)}
                  alt={course.title}
                  width={1000}
                  height={500}
                  className="w-full object-cover"
                />
                <section className="space-y-3 p-4">
                  <div>{course.title}</div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button size="sm">Stats</Button>
                    <Link href={`/admin/courses/${course.slug}`}>
                      <Button size="sm">Edit Content</Button>
                    </Link>
                  </div>
                </section>
              </div>
            ))
          : "Course  Not found!"}
      </section>
    </main>
  )
}

export default GetAppCoursesPage
