"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Calendar, AlertCircle } from "lucide-react"

export default function AdminDashboard({ user }) {
  const stats = [
    { label: "Total Students", value: "156", icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Active Classes", value: "12", icon: BookOpen, color: "bg-green-100 text-green-600" },
    { label: "Scheduled Classes", value: "48", icon: Calendar, color: "bg-purple-100 text-purple-600" },
    { label: "Pending Tasks", value: "8", icon: AlertCircle, color: "bg-orange-100 text-orange-600" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage classes, users, and system settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest system activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New class created", time: "2 hours ago", user: "Ms. Sarah" },
              { action: "Student enrolled", time: "4 hours ago", user: "John Doe" },
              { action: "Homework submitted", time: "6 hours ago", user: "Emma Wilson" },
              { action: "Attendance marked", time: "1 day ago", user: "Class 101" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
