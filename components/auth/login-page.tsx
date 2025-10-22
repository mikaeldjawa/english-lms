"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

const DEMO_USERS = [
  { id: 1, name: "Admin User", email: "admin@englishclub.com", role: "admin" },
  { id: 2, name: "Ms. Sarah Teacher", email: "sarah@englishclub.com", role: "teacher" },
  { id: 3, name: "John Student", email: "john@englishclub.com", role: "student" },
  { id: 4, name: "Parent Account", email: "parent@englishclub.com", role: "parent" },
]

export default function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null)

  const handleSelectUser = (user) => {
    onLogin(user)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">English Club</h1>
          </div>
          <p className="text-gray-600">Learning Management System</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Select Your Role</CardTitle>
            <CardDescription>Choose a demo account to explore the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEMO_USERS.map((user) => (
              <Button
                key={user.id}
                onClick={() => handleSelectUser(user)}
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-300"
              >
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">Demo accounts - No password required</p>
      </div>
    </div>
  )
}
