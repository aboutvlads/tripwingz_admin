import { Bell, Menu, Settings } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="grid gap-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                tripwingz admin
              </Link>
              <Link
                href="/admin/deals"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
              >
                Deals
              </Link>
              <Link
                href="/admin/regions"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
              >
                Regions
              </Link>
              <Link
                href="/admin/vibes"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
              >
                Vibes
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:gap-6">
          <Link
            href="/admin"
            className="hidden items-center gap-2 text-lg font-semibold md:flex"
          >
            tripwingz admin
          </Link>
          <nav className="hidden gap-4 md:flex md:gap-6">
            <Link
              href="/admin/deals"
              className="text-sm font-medium hover:underline"
            >
              Deals
            </Link>
            <Link
              href="/admin/regions"
              className="text-sm font-medium hover:underline"
            >
              Regions
            </Link>
            <Link
              href="/admin/vibes"
              className="text-sm font-medium hover:underline"
            >
              Vibes
            </Link>
          </nav>
          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="p-4 md:p-6">{children}</main>
    </div>
  )
}

