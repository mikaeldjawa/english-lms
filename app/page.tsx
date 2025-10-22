"use client"

import { useState } from "react"
import LoginPage from "@/components/auth/login-page"
import Dashboard from "@/components/dashboard/dashboard"

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />
}
