"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, TrendingUp, Calendar, AlertCircle } from "lucide-react"

export default function ParentDashboard({ user }) {
  const children = [
    {
      id: 1,
      name: "John Student",
      class: "English 101",
      attendance: 92,
      overallGrade: "A-",
      subjects: [
        { subject: "Grammar", score: 85 },
        { subject: "Vocabulary", score: 78 },
        { subject: "Speaking", score: 72 },
        { subject: "Writing", score: 80 },
      ],
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor your child's performance and attendance</p>
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600">Attendance Rate</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{child.attendance}%</p>
                  <p className="text-xs text-gray-500 mt-1">Classes attended</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-gray-600">Overall Grade</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{child.overallGrade}</p>
                  <p className="text-xs text-gray-500 mt-1">Current performance</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-600">Status</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mt-2">Good</p>
                  <p className="text-xs text-gray-500 mt-1">On track</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-4">Subject Performance</p>
                <div className="space-y-3">
                  {child.subjects.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                        <p className="text-sm font-semibold text-gray-900">{item.score}%</p>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
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
          <CardDescription>Latest performance and attendance updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "Homework Submitted", date: "Today", type: "homework", icon: "📝" },
              { title: "Class Attended", date: "Yesterday", type: "attendance", icon: "✓" },
              { title: "Performance Improved", date: "2 days ago", type: "performance", icon: "📈" },
              { title: "Teacher Feedback", date: "3 days ago", type: "feedback", icon: "💬" },
            ].map((update, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{update.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{update.title}</p>
                    <p className="text-xs text-gray-500">{update.type}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{update.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
