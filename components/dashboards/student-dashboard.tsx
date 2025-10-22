"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, BookMarked, TrendingUp, AlertCircle } from "lucide-react"

export default function StudentDashboard({ user }) {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-1">Your learning progress and assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Next Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-gray-900">English 101</p>
              <p className="text-sm text-gray-600 mt-1">Tomorrow at 10:00 AM</p>
              <p className="text-sm text-gray-500 mt-2">Room A - Ms. Sarah</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-orange-600" />
              Pending Homework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="font-semibold text-gray-900">Essay Writing</p>
                <p className="text-xs text-gray-500 mt-1">Due: Tomorrow</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="font-semibold text-gray-900">Grammar Exercise</p>
                <p className="text-xs text-gray-500 mt-1">Due: In 3 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Your Progress
          </CardTitle>
          <CardDescription>Overall learning performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { subject: "Grammar", progress: 85 },
              { subject: "Vocabulary", progress: 78 },
              { subject: "Speaking", progress: 72 },
              { subject: "Writing", progress: 80 },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.progress}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Attendance Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">92%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Classes Attended</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">23/25</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
