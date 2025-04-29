import CourseDetailPage, {
  CourseDetailPageProps,
} from "@/views/pages/admin/course-detail-page"

const Page = async ({ params }: CourseDetailPageProps) => {
  return <CourseDetailPage params={params} />
}

export default Page
