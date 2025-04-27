"use client"

import { registerAction } from "@/servers/actions/auth/register.action"
import Button from "@/views/components/ui/button"
import Input from "@/views/components/ui/input"
import Link from "next/link"
import React, { useActionState } from "react"

const RegisterPage = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  return (
    <>
      <section>
        <h3>Register</h3>
        <p>Create an account to get started</p>
      </section>
      <form action={formAction} className="space-y-2">
        <Input
          name="name"
          type="text"
          placeholder="Name"
          defaultValue={state?.data?.name}
        />
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
          {isPending ? "Registering..." : "Register"}
        </Button>

        {state?.errors?.errorFields?.name ? (
          <div className="msg msg-error">{state.errors.errorFields.name}</div>
        ) : null}
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
      <section>
        <p>
          Have an account?{" "}
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </p>
      </section>
    </>
  )
}

export default RegisterPage
