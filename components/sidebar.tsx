"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Users,
  Package,
  Calendar,
  Settings,
  LifeBuoy,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItemProps {
  icon: React.ReactNode
  title: string
  href: string
  isActive?: boolean
  isCollapsed?: boolean
}

function NavItem({ icon, title, href, isActive, isCollapsed }: NavItemProps) {
  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-zinc-900",
                isActive ? "bg-zinc-900 text-white" : "text-zinc-400",
              )}
            >
              {icon}
              <span className="sr-only">{title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-zinc-800 bg-zinc-950 text-white">
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-zinc-900",
        isActive ? "bg-zinc-900 text-white" : "text-zinc-400",
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  )
}

function SubNavItem({
  title,
  href,
  isActive,
  isCollapsed,
}: { title: string; href: string; isActive?: boolean; isCollapsed?: boolean }) {
  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:bg-zinc-900 ml-1",
                isActive ? "bg-zinc-900 text-white" : "text-zinc-400",
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
              <span className="sr-only">{title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="border-zinc-800 bg-zinc-950 text-white">
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-zinc-900 ml-6",
        isActive ? "bg-zinc-900 text-white" : "text-zinc-400",
      )}
    >
      <span>{title}</span>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check if the current path matches or starts with a given path
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(path)
  }

  // This ensures the submenu is visible when the sidebar is opened
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen)
    // If we're opening the sidebar and catalog was previously open, keep it open
    if (!isOpen && catalogOpen) {
      setCatalogOpen(true)
    }
  }

  // Auto-open catalog submenu if we're on a catalog page
  useEffect(() => {
    if (pathname.includes("/dashboard/catalog")) {
      setCatalogOpen(true)
    }
  }, [pathname])

  // Dispatch custom event when sidebar is collapsed/expanded
  useEffect(() => {
    const event = new CustomEvent("sidebar-toggle", { detail: { collapsed: isCollapsed } })
    window.dispatchEvent(event)
  }, [isCollapsed])

  return (
    <>
      <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden" onClick={handleToggleSidebar}>
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 transform border-r border-zinc-800 bg-black transition-all duration-200 ease-in-out md:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className={cn("flex h-16 items-center border-b border-zinc-800", isCollapsed ? "justify-center" : "px-6")}>
          {!isCollapsed && <span className="text-lg font-semibold">Admin Panel</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("h-8 w-8 rounded-full", isCollapsed ? "ml-0" : "ml-auto")}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            <span className="sr-only">{isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
          </Button>
        </div>
        <div className="space-y-4 py-4">
          <div className={cn("py-2", isCollapsed ? "px-2" : "px-3")}>
            {!isCollapsed && (
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Dashboard
              </h2>
            )}
            <div className="space-y-1">
              <NavItem
                icon={<BarChart3 className="h-4 w-4" />}
                title="Analytics"
                href="/dashboard"
                isActive={isActive("/dashboard") && !pathname.includes("/dashboard/")}
                isCollapsed={isCollapsed}
              />
              <NavItem
                icon={<Users className="h-4 w-4" />}
                title="Users"
                href="/dashboard/users"
                isActive={isActive("/dashboard/users")}
                isCollapsed={isCollapsed}
              />

              {/* Catalog Submenu */}
              <div className="space-y-1">
                {isCollapsed ? (
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setCatalogOpen(!catalogOpen)}
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-zinc-900",
                            catalogOpen || isActive("/dashboard/catalog") ? "bg-zinc-900 text-white" : "text-zinc-400",
                          )}
                        >
                          <Package className="h-4 w-4" />
                          <span className="sr-only">Catalog</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="border-zinc-800 bg-zinc-950 text-white">
                        Catalog
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <button
                    onClick={() => setCatalogOpen(!catalogOpen)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:bg-zinc-900",
                      catalogOpen || isActive("/dashboard/catalog") ? "bg-zinc-900 text-white" : "text-zinc-400",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4" />
                      <span>Catalog</span>
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", catalogOpen && "rotate-180")} />
                  </button>
                )}

                {catalogOpen && (
                  <div className={cn("space-y-1 pt-1", isCollapsed && "flex flex-col items-center")}>
                    <SubNavItem
                      title="Products"
                      href="/dashboard/catalog/products"
                      isActive={isActive("/dashboard/catalog/products")}
                      isCollapsed={isCollapsed}
                    />
                    <SubNavItem
                      title="Categories"
                      href="/dashboard/catalog/categories"
                      isActive={isActive("/dashboard/catalog/categories")}
                      isCollapsed={isCollapsed}
                    />
                    <SubNavItem
                      title="Tags"
                      href="/dashboard/catalog/tags"
                      isActive={isActive("/dashboard/catalog/tags")}
                      isCollapsed={isCollapsed}
                    />
                  </div>
                )}
              </div>

              <NavItem
                icon={<Calendar className="h-4 w-4" />}
                title="Schedule"
                href="/dashboard/schedule"
                isActive={isActive("/dashboard/schedule")}
                isCollapsed={isCollapsed}
              />
            </div>
          </div>
          <div className={cn("py-2", isCollapsed ? "px-2" : "px-3")}>
            {!isCollapsed && (
              <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Settings
              </h2>
            )}
            <div className="space-y-1">
              <NavItem
                icon={<Settings className="h-4 w-4" />}
                title="General"
                href="/dashboard/settings"
                isActive={isActive("/dashboard/settings")}
                isCollapsed={isCollapsed}
              />
              <NavItem
                icon={<LifeBuoy className="h-4 w-4" />}
                title="Support"
                href="/dashboard/support"
                isActive={isActive("/dashboard/support")}
                isCollapsed={isCollapsed}
              />
            </div>
          </div>
        </div>
        <div className={cn("absolute bottom-4 w-full", isCollapsed ? "px-2" : "px-3")}>
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Log out</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="border-zinc-800 bg-zinc-950 text-white">
                  Log out
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

