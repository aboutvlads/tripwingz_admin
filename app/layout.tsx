import { LayoutGrid, LogOut, Plane, Settings, Users } from 'lucide-react'
import Link from "next/link"
import { ErrorBoundary } from 'react-error-boundary'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "A modern admin dashboard built with Next.js",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutGrid,
    },
    {
      name: "Deals",
      href: "/admin/deals",
      icon: Plane,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
          <div className="min-h-screen bg-gray-50">
            <div className="flex h-16 items-center gap-4 border-b bg-white px-6">
              <Link href="/admin" className="flex items-center gap-2 font-semibold">
                <Plane className="h-5 w-5" />
                TripWingz Admin
              </Link>
              <div className="ml-auto">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">View Site</Link>
                </Button>
              </div>
            </div>
            <div className="flex">
              <aside className="w-64 border-r bg-white">
                <nav className="flex h-[calc(100vh-4rem)] flex-col gap-2 p-4">
                  <div className="flex-1 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900",
                          "font-medium"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <Button variant="ghost" className="justify-start text-red-600" asChild>
                    <Link href="/logout" className="flex items-center gap-3">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Link>
                  </Button>
                </nav>
              </aside>
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
