"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "../../components/sidebar"
import { Header } from "../../components/header"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Listen for custom event from sidebar
  useEffect(() => {
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsSidebarCollapsed(e.detail.collapsed)
    }

    window.addEventListener("sidebar-toggle" as any, handleSidebarToggle as any)

    return () => {
      window.removeEventListener("sidebar-toggle" as any, handleSidebarToggle as any)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col dark bg-black text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className={cn(
            "flex-1 p-6 lg:p-8 overflow-auto transition-all duration-200",
            isSidebarCollapsed ? "md:ml-16" : "md:ml-64",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

