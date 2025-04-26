import { verifyUserAction } from "@/servers/actions/auth/verify.action"
import React from "react"

export interface VerifyPageProps {
  searchParams: Promise<{
    user?: string
    code?: string
  }>
}

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const { user, code } = await searchParams

  if (!user || !code) {
    return <div>User or code is required</div>
  }

  const verify = await verifyUserAction({
    userId: user,
    code: code,
  })

  if (verify.status === "error") {
    return <div>{verify.message}</div>
  }

  return (
    <div>
      <h1>Verify Page</h1>
      <p>{verify.message}</p>
    </div>
  )
}

export default VerifyPage
