"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Bell, User } from "lucide-react"

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-500 capitalize">{user.role} Account</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5 text-gray-600" />
        </Button>
        <Button onClick={onLogout} variant="outline" size="sm" className="gap-2 bg-transparent">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}
