"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, Plus, Users } from "lucide-react"

const CLASSES_DATA = [
  {
    id: 1,
    name: "English 101",
    teacher: "Ms. Sarah",
    students: 25,
    schedule: "Mon, Wed, Fri 9:00 AM",
    room: "Room A",
    status: "active",
  },
  {
    id: 2,
    name: "English 102",
    teacher: "Mr. John",
    students: 22,
    schedule: "Tue, Thu 11:00 AM",
    room: "Room B",
    status: "active",
  },
  {
    id: 3,
    name: "English 103",
    teacher: "Ms. Emma",
    students: 20,
    schedule: "Mon, Wed 2:00 PM",
    room: "Room C",
    status: "active",
  },
]

export default function ClassManagementPage({ user }) {
  const [classes, setClasses] = useState(CLASSES_DATA)
  const [showAddForm, setShowAddForm] = useState(false)

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id))
  }

  const handleAddClass = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newClass = {
      id: classes.length + 1,
      name: formData.get("name"),
      teacher: formData.get("teacher"),
      students: 0,
      schedule: formData.get("schedule"),
      room: formData.get("room"),
      status: "active",
    }
    setClasses([...classes, newClass])
    setShowAddForm(false)
    e.target.reset()
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
        <p className="text-gray-600 mt-1">Create and manage classes</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Classes</CardTitle>
              <CardDescription>Total classes: {classes.length}</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Class
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showAddForm && (
            <form onSubmit={handleAddClass} className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Class Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., English 101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Teacher</label>
                  <input
                    type="text"
                    name="teacher"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Teacher name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Schedule</label>
                  <input
                    type="text"
                    name="schedule"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mon, Wed, Fri 9:00 AM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Room</label>
                  <input
                    type="text"
                    name="room"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Room A"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Create Class
                </Button>
                <Button type="button" onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {classes.length > 0 ? (
              classes.map((cls) => (
                <div key={cls.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{cls.name}</p>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-sm text-gray-600">
                        <p>Teacher: {cls.teacher}</p>
                        <p className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {cls.students} students
                        </p>
                        <p>Schedule: {cls.schedule}</p>
                        <p>Room: {cls.room}</p>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded capitalize">
                          {cls.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClass(cls.id)}
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No classes created yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
