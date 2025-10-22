"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookMarked } from "lucide-react"

export default function TeacherDashboard({ user }) {
  const upcomingClasses = [
    { id: 1, name: "English 101", time: "10:00 AM", students: 25, room: "Room A" },
    { id: 2, name: "English 102", time: "2:00 PM", students: 22, room: "Room B" },
  ]

  const recentHomework = [
    { id: 1, title: "Essay Writing", class: "English 101", submitted: 18, total: 25 },
    { id: 2, title: "Grammar Exercise", class: "English 102", submitted: 20, total: 22 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your classes and track student progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Next Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{cls.name}</p>
                  <p className="text-sm text-gray-600">
                    {cls.time} - {cls.room}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{cls.students} students</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-green-600" />
              Homework Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentHomework.map((hw) => (
                <div key={hw.id} className="p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{hw.title}</p>
                  <p className="text-sm text-gray-600">{hw.class}</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(hw.submitted / hw.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {hw.submitted}/{hw.total} submitted
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Overview</CardTitle>
          <CardDescription>Your teaching schedule and classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { class: "English 101", students: 25, attendance: 92 },
              { class: "English 102", students: 22, attendance: 88 },
              { class: "English 103", students: 20, attendance: 95 },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{cls.class}</p>
                  <p className="text-sm text-gray-500">{cls.students} students</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{cls.attendance}%</p>
                  <p className="text-xs text-gray-500">Attendance</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
