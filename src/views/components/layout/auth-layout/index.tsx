import React from "react"

export interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-[300px] space-y-6">{children}</div>
    </main>
  )
}

export default AuthLayout
