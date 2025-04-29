import { CourseService } from "@/servers/services/course.service"
import CreateCourseSection from "@/views/components/course/create-course-section"
import CreateCourseSectionLesson from "@/views/components/course/create-course-section-lesson"
import DeleteCourseSection from "@/views/components/course/delete-course-section"
import DeleteCourseSectionLesson from "@/views/components/course/delete-course-section-lesson"
import Button from "@/views/components/ui/button"
import Card from "@/views/components/ui/card"
import DragIcon from "@/views/components/ui/icons/drag-icon"
import { redirect } from "next/navigation"

export interface CourseDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

const CourseDetailPage = async ({ params }: CourseDetailPageProps) => {
  const { slug } = await params
  const course = await CourseService.getDetails(slug)

  if (!course) {
    redirect("/admin/courses")
  }

  return (
    <main className="m-auto max-w-2xl space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-sm text-gray-500">{course.description}</p>
        <Button size="sm" className="w-fit">
          Publish Course
        </Button>
      </section>
      <section className="space-y-4">
        <CreateCourseSection courseId={course.id} />
        <section className="space-y-4">
          {course.courseSections.map((section) => (
            <Card key={section.id} className="p-2">
              <section className="flex justify-between items-center">
                <div className="flex items-center gap-2 ml-2">
                  <DragIcon className="w-4 h-4" />
                  <div>{section.title}</div>
                </div>
                <div className="flex gap-2 m-0">
                  <Button size="sm" variant="secondary" className="w-fit">
                    Edit
                  </Button>
                  <DeleteCourseSection courseSectionId={section.id} />
                  <CreateCourseSectionLesson courseSectionId={section.id} />
                </div>
              </section>
              {section?.courseSectionLessons?.length > 0 ? (
                <section className="space-y-2 mt-2">
                  {section.courseSectionLessons.map((lesson) => (
                    <Card key={lesson.id} className="p-2 space-y-2">
                      <section className="flex justify-between items-center">
                        <div className="flex items-center gap-2 ml-2">
                          <DragIcon className="w-4 h-4" />
                          <div>{lesson.title}</div>
                        </div>
                        <div className="flex gap-2 m-0">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-fit">
                            Edit
                          </Button>
                          <DeleteCourseSectionLesson
                            courseSectionLessonId={lesson.id}
                          />
                        </div>
                      </section>
                    </Card>
                  ))}
                </section>
              ) : null}
            </Card>
          ))}
        </section>
      </section>
    </main>
  )
}

export default CourseDetailPage
