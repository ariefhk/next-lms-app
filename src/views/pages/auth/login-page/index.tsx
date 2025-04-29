"use client"

import { loginAction } from "@/servers/actions/auth/login.action"
import GoogleSocialLogin from "@/views/components/auth/google-social-login"
import Button from "@/views/components/ui/button"
import Input from "@/views/components/ui/input"
import Message from "@/views/components/ui/message"
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
        <Input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={state?.data?.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={state?.data?.password}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
        <Message type="error" message={state?.errors?.errorFields?.email} />
        <Message type="error" message={state?.errors?.errorFields?.password} />
        <Message type="error" message={state?.message} />
        <Message type="success" message={state?.message} />
      </form>
      <GoogleSocialLogin />
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
