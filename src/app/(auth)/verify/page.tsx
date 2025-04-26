import VerifyPage, { VerifyPageProps } from "@/views/pages/auth/verify-page"

const Page = async ({ searchParams }: VerifyPageProps) => {
  return <VerifyPage searchParams={searchParams} />
}

export default Page
