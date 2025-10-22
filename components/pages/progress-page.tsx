"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"
import { Download, TrendingUp } from "lucide-react"

const PROGRESS_DATA = [
  { month: "Aug", grammar: 65, vocabulary: 60, speaking: 55, writing: 62 },
  { month: "Sep", grammar: 72, vocabulary: 68, speaking: 62, writing: 70 },
  { month: "Oct", grammar: 85, vocabulary: 78, speaking: 72, writing: 80 },
]

const CLASS_PERFORMANCE = [
  { class: "English 101", average: 82, students: 25, trend: "up" },
  { class: "English 102", average: 78, students: 22, trend: "up" },
  { class: "English 103", average: 75, students: 20, trend: "stable" },
]

const SUBJECT_SCORES = [
  { subject: "Grammar", score: 85, target: 90, improvement: "+8%" },
  { subject: "Vocabulary", score: 78, target: 85, improvement: "+6%" },
  { subject: "Speaking", score: 72, target: 80, improvement: "+5%" },
  { subject: "Writing", score: 80, target: 90, improvement: "+7%" },
]

const STUDENT_PERFORMANCE = [
  { name: "John Student", grammar: 85, vocabulary: 78, speaking: 72, writing: 80 },
  { name: "Emma Wilson", grammar: 92, vocabulary: 88, speaking: 85, writing: 90 },
  { name: "Michael Brown", grammar: 78, vocabulary: 72, speaking: 68, writing: 75 },
  { name: "Sarah Davis", grammar: 88, vocabulary: 82, speaking: 80, writing: 85 },
]

export default function ProgressPage({ user }) {
  const handleDownloadReport = () => {
    alert("Report downloaded successfully!")
  }

  if (user.role === "teacher") {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Class Progress Reports</h1>
            <p className="text-gray-600 mt-1">Track student performance and class analytics</p>
          </div>
          <Button onClick={handleDownloadReport} className="gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLASS_PERFORMANCE.map((cls, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">{cls.class}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-blue-600">{cls.average}</p>
                    <p className="text-sm text-gray-600">avg score</p>
                  </div>
                  <p className="text-sm text-gray-500">{cls.students} students</p>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending {cls.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Class Performance Comparison</CardTitle>
            <CardDescription>Student scores across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={STUDENT_PERFORMANCE}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="grammar" fill="#3b82f6" name="Grammar" />
                <Bar dataKey="vocabulary" fill="#10b981" name="Vocabulary" />
                <Bar dataKey="speaking" fill="#f59e0b" name="Speaking" />
                <Bar dataKey="writing" fill="#8b5cf6" name="Writing" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Performance Details</CardTitle>
            <CardDescription>Individual student scores and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {STUDENT_PERFORMANCE.map((student, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <div className="grid grid-cols-4 gap-2 mt-2 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Grammar</p>
                      <p className="font-semibold text-gray-900">{student.grammar}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Vocabulary</p>
                      <p className="font-semibold text-gray-900">{student.vocabulary}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Speaking</p>
                      <p className="font-semibold text-gray-900">{student.speaking}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Writing</p>
                      <p className="font-semibold text-gray-900">{student.writing}</p>
                    </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Report</h1>
          <p className="text-gray-600 mt-1">Track your learning progress over time</p>
        </div>
        <Button onClick={handleDownloadReport} className="gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progress Trend</CardTitle>
          <CardDescription>Your performance over the last 3 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={PROGRESS_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="grammar" stroke="#3b82f6" name="Grammar" />
              <Line type="monotone" dataKey="vocabulary" stroke="#10b981" name="Vocabulary" />
              <Line type="monotone" dataKey="speaking" stroke="#f59e0b" name="Speaking" />
              <Line type="monotone" dataKey="writing" stroke="#8b5cf6" name="Writing" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Performance</CardTitle>
          <CardDescription>Your scores vs target goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {SUBJECT_SCORES.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{item.subject}</p>
                    <p className="text-xs text-green-600">{item.improvement}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.score}/{item.target}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${(item.score / item.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Notes</CardTitle>
          <CardDescription>Feedback from your instructors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { teacher: "Ms. Sarah", note: "Great improvement in grammar! Keep practicing.", date: "Oct 20" },
            { teacher: "Mr. John", note: "Your vocabulary is expanding well. Focus on pronunciation.", date: "Oct 18" },
            { teacher: "Ms. Emma", note: "Excellent writing skills. Work on speaking confidence.", date: "Oct 15" },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{item.teacher}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                </div>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
