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
        <Input name="name" type="text" placeholder="Name" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
        {state?.status === "success" ? (
          <div className="text-green-500">{state.message}</div>
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
