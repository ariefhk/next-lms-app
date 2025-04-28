import AppBrand from "../../ui/app-brand"
import Menu from "../../ui/menu"

export interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="w-[260px] p-4 flex flex-col gap-6 border-r border-slate-200 bg-white text-slate-950">
        <AppBrand className="ml-3" />
        <section>
          <h5 className="ml-3 text-xs font-medium text-slate-500">
            Platform Menu
          </h5>
          <Menu label="My Courses" href="/dashboard/my-courses" />
          <Menu label="Certificates" href="/dashboard/certificates" />
          <Menu label="Orders" href="/dashboard/orders" />
        </section>
      </aside>
      <main className="h-screen w-[calc(100%-260px)] overflow-y-auto bg-white p-8">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
