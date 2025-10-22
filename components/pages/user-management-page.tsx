"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, Plus } from "lucide-react"

const USERS_DATA = [
  {
    id: 1,
    name: "Ms. Sarah",
    email: "sarah@englishclub.com",
    role: "teacher",
    status: "active",
    joinDate: "2024-01-15",
  },
  { id: 2, name: "Mr. John", email: "john@englishclub.com", role: "teacher", status: "active", joinDate: "2024-01-20" },
  { id: 3, name: "Ms. Emma", email: "emma@englishclub.com", role: "teacher", status: "active", joinDate: "2024-02-01" },
  {
    id: 4,
    name: "John Student",
    email: "john.student@englishclub.com",
    role: "student",
    status: "active",
    joinDate: "2024-03-10",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma.wilson@englishclub.com",
    role: "student",
    status: "active",
    joinDate: "2024-03-12",
  },
  {
    id: 6,
    name: "Parent One",
    email: "parent1@englishclub.com",
    role: "parent",
    status: "active",
    joinDate: "2024-03-15",
  },
]

export default function UserManagementPage({ user }) {
  const [users, setUsers] = useState(USERS_DATA)
  const [filterRole, setFilterRole] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredUsers = filterRole === "all" ? users : users.filter((u) => u.role === filterRole)

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleAddUser = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newUser = {
      id: users.length + 1,
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    }
    setUsers([...users, newUser])
    setShowAddForm(false)
    e.target.reset()
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage teachers, students, and parents</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Total users: {users.length}</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showAddForm && (
            <form onSubmit={handleAddUser} className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Role</label>
                <select
                  name="role"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Add User
                </Button>
                <Button type="button" onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "teacher", "student", "parent"].map((role) => (
              <Button
                key={role}
                onClick={() => setFilterRole(role)}
                variant={filterRole === role ? "default" : "outline"}
                className="whitespace-nowrap capitalize"
              >
                {role === "all" ? "All Users" : role}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{u.name}</p>
                    <p className="text-sm text-gray-600">{u.email}</p>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span className="capitalize px-2 py-1 bg-blue-100 text-blue-700 rounded">{u.role}</span>
                      <span className="capitalize px-2 py-1 bg-green-100 text-green-700 rounded">{u.status}</span>
                      <span>{u.joinDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDeleteUser(u.id)} variant="destructive" size="sm" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No users found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
