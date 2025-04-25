import AuthLayout, {
  AuthLayoutProps,
} from "@/views/components/layout/auth-layout"

const Layout = ({ children }: AuthLayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
