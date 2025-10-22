"use client"

import { useState } from "react"
import Header from "@/components/dashboard/header"
import Sidebar from "@/components/dashboard/sidebar"
import AdminDashboard from "@/components/dashboards/admin-dashboard"
import TeacherDashboard from "@/components/dashboards/teacher-dashboard"
import StudentDashboard from "@/components/dashboards/student-dashboard"
import ParentDashboard from "@/components/dashboards/parent-dashboard"
import SchedulePage from "@/components/pages/schedule-page"
import AttendancePage from "@/components/pages/attendance-page"
import HomeworkPage from "@/components/pages/homework-page"
import ProgressPage from "@/components/pages/progress-page"
import CommunicationPage from "@/components/pages/communication-page"
import UserManagementPage from "@/components/pages/user-management-page"
import ClassManagementPage from "@/components/pages/class-management-page"
import MaterialsPage from "@/components/pages/materials-page"

export default function Dashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        if (user.role === "admin") return <AdminDashboard user={user} />
        if (user.role === "teacher") return <TeacherDashboard user={user} />
        if (user.role === "student") return <StudentDashboard user={user} />
        if (user.role === "parent") return <ParentDashboard user={user} />
        break
      case "users":
        return <UserManagementPage user={user} />
      case "classes":
        return <ClassManagementPage user={user} />
      case "schedule":
        return <SchedulePage user={user} />
      case "attendance":
        return <AttendancePage user={user} />
      case "homework":
        return <HomeworkPage user={user} />
      case "materials":
        return <MaterialsPage user={user} />
      case "progress":
        return <ProgressPage user={user} />
      case "communication":
        return <CommunicationPage user={user} />
      default:
        return <AdminDashboard user={user} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
