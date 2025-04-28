import AppBrand from "../../ui/app-brand"
import Menu from "../../ui/menu"

export interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="w-[260px] p-4 flex flex-col gap-6 border-r border-slate-200 bg-white text-slate-950">
        <AppBrand className="ml-3" />
        <section>
          <h5 className="ml-3 text-xs font-medium text-slate-500">
            Admin Menu
          </h5>
          <Menu label="Analytics" href="/admin/analytics" />
          <Menu label="Flash Sale" href="/admin/flash-sale" />
          <Menu label="Courses" href="/admin/courses" />
          <Menu
            label="Certificates Approval"
            href="/admin/certificates-approval"
          />
          <Menu label="Users" href="/admin/users" />
        </section>
      </aside>
      <main className="h-screen w-[calc(100%-260px)] overflow-y-auto bg-white p-8">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout
