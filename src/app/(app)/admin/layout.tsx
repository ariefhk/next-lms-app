import AdminLayout, {
  AdminLayoutProps,
} from "@/views/components/layout/admin-layout"

const Layout = ({ children }: AdminLayoutProps) => {
  return <AdminLayout>{children}</AdminLayout>
}

export default Layout
