"use client"

import { loginAction } from "@/servers/actions/auth/login.action"
import Button from "@/views/components/ui/button"
import Input from "@/views/components/ui/input"
import Link from "next/link"
import React, { useActionState } from "react"

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <>
      <section>
        <h3>Login</h3>
        <p>Welcome back! </p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
        {state?.status === "success" ? (
          <div className="text-green-500">{state.message}</div>
        ) : null}
      </form>
      <section>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </p>
      </section>
    </>
  )
}

export default LoginPage
