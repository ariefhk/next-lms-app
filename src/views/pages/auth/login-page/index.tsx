"use client"

import { loginAction } from "@/servers/actions/auth/login.action"
import GoogleSocialLogin from "@/views/components/auth/google-social-login"
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
        {state?.errors?.errorFields?.email ? (
          <div className="msg msg-error">{state.errors.errorFields.email}</div>
        ) : null}
        {state?.errors?.errorFields?.password ? (
          <div className="msg msg-error">
            {state.errors.errorFields.password}
          </div>
        ) : null}
        {state?.status === "success" ? (
          <div className="msg msg-success">{state.message}</div>
        ) : null}
        {state?.status === "error" ? (
          <div className="msg msg-error">{state.message}</div>
        ) : null}
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
