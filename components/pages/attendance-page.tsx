"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

const ATTENDANCE_DATA = [
  { id: 1, date: "2024-10-20", class: "English 101", status: "present", time: "9:05 AM" },
  { id: 2, date: "2024-10-19", class: "English 102", status: "present", time: "11:02 AM" },
  { id: 3, date: "2024-10-18", class: "English 103", status: "absent", time: "-" },
  { id: 4, date: "2024-10-17", class: "English 101", status: "present", time: "9:00 AM" },
  { id: 5, date: "2024-10-16", class: "English 102", status: "present", time: "11:01 AM" },
]

const STUDENT_ATTENDANCE_DATA = [
  { id: 1, name: "John Student", class: "English 101", status: "unmarked", time: null },
  { id: 2, name: "Emma Wilson", class: "English 101", status: "unmarked", time: null },
  { id: 3, name: "Michael Brown", class: "English 101", status: "unmarked", time: null },
  { id: 4, name: "Sarah Davis", class: "English 101", status: "unmarked", time: null },
  { id: 5, name: "James Miller", class: "English 101", status: "unmarked", time: null },
]

export default function AttendancePage({ user }) {
  const [attendanceRecords, setAttendanceRecords] = useState(ATTENDANCE_DATA)
  const [studentAttendance, setStudentAttendance] = useState(STUDENT_ATTENDANCE_DATA)
  const [selectedClass, setSelectedClass] = useState("English 101")

  const presentCount = attendanceRecords.filter((r) => r.status === "present").length
  const absentCount = attendanceRecords.filter((r) => r.status === "absent").length
  const attendanceRate = Math.round((presentCount / attendanceRecords.length) * 100)

  const handleMarkAttendance = (studentId, status) => {
    setStudentAttendance(
      studentAttendance.map((student) =>
        student.id === studentId
          ? { ...student, status, time: status === "present" ? new Date().toLocaleTimeString() : null }
          : student,
      ),
    )
  }

  const handleResetAttendance = () => {
    setStudentAttendance(
      studentAttendance.map((student) => ({
        ...student,
        status: "unmarked",
        time: null,
      })),
    )
  }

  if (user.role === "teacher") {
    const markedCount = studentAttendance.filter((s) => s.status !== "unmarked").length
    const presentCount = studentAttendance.filter((s) => s.status === "present").length

    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-gray-600 mt-1">Record student attendance for today's class</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Class</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{selectedClass}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Marked</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">{markedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-600 mt-2">{presentCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student Attendance</CardTitle>
                <CardDescription>Mark attendance for each student</CardDescription>
              </div>
              <Button onClick={handleResetAttendance} variant="outline" size="sm">
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {studentAttendance.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.class}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {student.status !== "unmarked" && (
                      <span className="text-xs text-gray-500">{student.time || "Marked"}</span>
                    )}
                    <Button
                      onClick={() => handleMarkAttendance(student.id, "present")}
                      variant={student.status === "present" ? "default" : "outline"}
                      size="sm"
                      className="gap-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Present
                    </Button>
                    <Button
                      onClick={() => handleMarkAttendance(student.id, "absent")}
                      variant={student.status === "absent" ? "destructive" : "outline"}
                      size="sm"
                      className="gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-1">Your attendance history and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{attendanceRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{presentCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{absentCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>Recent attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {attendanceRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {record.status === "present" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{record.class}</p>
                    <p className="text-sm text-gray-500">{record.date}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600">{record.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
