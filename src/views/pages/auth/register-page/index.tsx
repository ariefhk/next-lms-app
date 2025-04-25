import Button from "@/views/components/ui/button"
import Input from "@/views/components/ui/input"
import Link from "next/link"
import React from "react"

const RegisterPage = () => {
  return (
    <>
      <section>
        <h3>Register</h3>
        <p>Create an account to get started</p>
      </section>
      <form action="" className="space-y-2">
        <Input name="name" type="text" placeholder="Name" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Register</Button>
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
