import Button from "@/views/components/ui/button"
import Input from "@/views/components/ui/input"
import Link from "next/link"
import React from "react"

const LoginPage = () => {
  return (
    <>
      <section>
        <h3>Login</h3>
        <p>Welcome back! </p>
      </section>
      <form action="" className="space-y-2">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
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
