"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export default function ParentDashboard({ user }) {
  const children = [{ id: 1, name: "John Student", class: "English 101", attendance: 92 }]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor your child's progress and attendance</p>
      </div>

      {children.map((child) => (
        <div key={child.id} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                {child.name}
              </CardTitle>
              <CardDescription>{child.class}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{child.attendance}%</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Overall Grade</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">A-</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-3">Subject Performance</p>
                <div className="space-y-2">
                  {[
                    { subject: "Grammar", score: 85 },
                    { subject: "Vocabulary", score: 78 },
                    { subject: "Speaking", score: 72 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{item.subject}</p>
                      <p className="font-semibold text-gray-900">{item.score}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest information from the school</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Homework Submitted", date: "Today" },
              { title: "Class Attended", date: "Yesterday" },
              { title: "Progress Report Available", date: "2 days ago" },
            ].map((update, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                <p className="text-gray-900">{update.title}</p>
                <p className="text-sm text-gray-500">{update.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
