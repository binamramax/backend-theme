import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import { DashboardContent } from "./components/dashboard-content"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col dark bg-black text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}

