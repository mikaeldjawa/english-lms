"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users, Video } from "lucide-react"

const SCHEDULE_DATA = {
  monday: [
    { time: "9:00 AM", class: "English 101", room: "Room A", teacher: "Ms. Sarah", duration: "1 hour", students: 25 },
    { time: "11:00 AM", class: "English 102", room: "Room B", teacher: "Mr. John", duration: "1 hour", students: 22 },
    { time: "2:00 PM", class: "English 103", room: "Room C", teacher: "Ms. Emma", duration: "1 hour", students: 20 },
  ],
  tuesday: [
    { time: "10:00 AM", class: "English 101", room: "Room A", teacher: "Ms. Sarah", duration: "1 hour", students: 25 },
    { time: "1:00 PM", class: "English 102", room: "Room B", teacher: "Mr. John", duration: "1 hour", students: 22 },
  ],
  wednesday: [
    { time: "9:00 AM", class: "English 103", room: "Room C", teacher: "Ms. Emma", duration: "1 hour", students: 20 },
    { time: "11:00 AM", class: "English 101", room: "Room A", teacher: "Ms. Sarah", duration: "1 hour", students: 25 },
    { time: "3:00 PM", class: "English 102", room: "Room B", teacher: "Mr. John", duration: "1 hour", students: 22 },
  ],
  thursday: [
    { time: "10:00 AM", class: "English 101", room: "Room A", teacher: "Ms. Sarah", duration: "1 hour", students: 25 },
    { time: "2:00 PM", class: "English 103", room: "Room C", teacher: "Ms. Emma", duration: "1 hour", students: 20 },
  ],
  friday: [
    { time: "9:00 AM", class: "English 102", room: "Room B", teacher: "Mr. John", duration: "1 hour", students: 22 },
    { time: "11:00 AM", class: "English 101", room: "Room A", teacher: "Ms. Sarah", duration: "1 hour", students: 25 },
  ],
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export default function SchedulePage({ user }) {
  const [selectedDay, setSelectedDay] = useState("monday")
  const [joinedClasses, setJoinedClasses] = useState([])

  const currentSchedule = SCHEDULE_DATA[selectedDay] || []

  const handleJoinClass = (className) => {
    if (!joinedClasses.includes(className)) {
      setJoinedClasses([...joinedClasses, className])
    }
  }

  const handleLeaveClass = (className) => {
    setJoinedClasses(joinedClasses.filter((c) => c !== className))
  }

  const isClassJoined = (className) => joinedClasses.includes(className)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
        <p className="text-gray-600 mt-1">Weekly class schedule and enrollment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Select a day to view classes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {DAYS.map((day) => (
              <Button
                key={day}
                onClick={() => setSelectedDay(day.toLowerCase())}
                variant={selectedDay === day.toLowerCase() ? "default" : "outline"}
                className="whitespace-nowrap"
              >
                {day}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {currentSchedule.length > 0 ? (
              currentSchedule.map((schedule, idx) => {
                const isJoined = isClassJoined(schedule.class)
                return (
                  <div
                    key={idx}
                    className={`p-4 border rounded-lg transition ${
                      isJoined ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{schedule.class}</p>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>
                              {schedule.time} ({schedule.duration})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span>{schedule.room}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span>{schedule.students} students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-orange-600" />
                            <span>{schedule.teacher}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {isJoined ? (
                          <>
                            <Button onClick={() => handleLeaveClass(schedule.class)} variant="destructive" size="sm">
                              Leave
                            </Button>
                            <Button variant="default" size="sm" disabled>
                              Joined
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => handleJoinClass(schedule.class)} size="sm">
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-center text-gray-500 py-8">No classes scheduled for this day</p>
            )}
          </div>
        </CardContent>
      </Card>

      {joinedClasses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Enrolled Classes</CardTitle>
            <CardDescription>Classes you have joined</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {joinedClasses.map((className) => (
                <div key={className} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-medium text-gray-900">{className}</p>
                  <Button
                    onClick={() => handleLeaveClass(className)}
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
