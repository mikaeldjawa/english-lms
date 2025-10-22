"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, LayoutDashboard, Calendar, Users, BookMarked, BarChart3, MessageSquare } from "lucide-react"

const MENU_ITEMS = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "homework", label: "Homework", icon: BookMarked },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "communication", label: "Communication", icon: MessageSquare },
  ],
  teacher: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "attendance", label: "Mark Attendance", icon: Users },
    { id: "homework", label: "Homework", icon: BookMarked },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "communication", label: "Communication", icon: MessageSquare },
  ],
  student: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "homework", label: "Homework", icon: BookMarked },
    { id: "progress", label: "Progress", icon: BarChart3 },
  ],
  parent: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "progress", label: "Progress", icon: BarChart3 },
  ],
}

export default function Sidebar({ user, currentPage, onPageChange }) {
  const menuItems = MENU_ITEMS[user.role] || []

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <span className="font-bold text-lg text-gray-900">English Club</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              variant={currentPage === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
