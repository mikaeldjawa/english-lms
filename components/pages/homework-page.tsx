"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, CheckCircle, Clock, AlertCircle } from "lucide-react"

const HOMEWORK_DATA = [
  {
    id: 1,
    title: "Essay Writing",
    class: "English 101",
    dueDate: "2024-10-22",
    status: "pending",
    description: "Write a 500-word essay on your favorite book",
    submissions: [],
  },
  {
    id: 2,
    title: "Grammar Exercise",
    class: "English 102",
    dueDate: "2024-10-21",
    status: "submitted",
    description: "Complete 20 grammar exercises",
    submissions: [{ studentName: "John Student", submittedDate: "2024-10-20", grade: null, feedback: "" }],
  },
  {
    id: 3,
    title: "Vocabulary List",
    class: "English 103",
    dueDate: "2024-10-20",
    status: "submitted",
    description: "Learn 50 new vocabulary words",
    submissions: [{ studentName: "John Student", submittedDate: "2024-10-19", grade: 95, feedback: "Excellent work!" }],
  },
  {
    id: 4,
    title: "Reading Comprehension",
    class: "English 101",
    dueDate: "2024-10-25",
    status: "pending",
    description: "Read chapter 5 and answer questions",
    submissions: [],
  },
]

const STUDENT_SUBMISSIONS = [
  { id: 1, name: "John Student", homework: "Essay Writing", submittedDate: "2024-10-21", grade: null, feedback: "" },
  {
    id: 2,
    name: "Emma Wilson",
    homework: "Essay Writing",
    submittedDate: "2024-10-20",
    grade: 88,
    feedback: "Good structure",
  },
  { id: 3, name: "Michael Brown", homework: "Essay Writing", submittedDate: null, grade: null, feedback: "" },
]

export default function HomeworkPage({ user }) {
  const [homeworkList, setHomeworkList] = useState(HOMEWORK_DATA)
  const [selectedHomework, setSelectedHomework] = useState(null)
  const [submissions, setSubmissions] = useState(STUDENT_SUBMISSIONS)
  const [filterStatus, setFilterStatus] = useState("all")
  const [gradingMode, setGradingMode] = useState(null)
  const [gradeInput, setGradeInput] = useState("")
  const [feedbackInput, setFeedbackInput] = useState("")

  const pendingCount = homeworkList.filter((h) => h.status === "pending").length
  const submittedCount = homeworkList.filter((h) => h.status === "submitted").length

  const handleSubmitHomework = (id) => {
    setHomeworkList(homeworkList.map((hw) => (hw.id === id ? { ...hw, status: "submitted" } : hw)))
    setSelectedHomework(null)
  }

  const handleGradeSubmission = (submissionId) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, grade: Number.parseInt(gradeInput) || null, feedback: feedbackInput } : sub,
      ),
    )
    setGradingMode(null)
    setGradeInput("")
    setFeedbackInput("")
  }

  const filteredHomework = homeworkList.filter((hw) => (filterStatus === "all" ? true : hw.status === filterStatus))

  if (user.role === "teacher") {
    const submittedCount = submissions.filter((s) => s.submittedDate).length
    const gradedCount = submissions.filter((s) => s.grade !== null).length

    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Homework Management</h1>
          <p className="text-gray-600 mt-1">Review and grade student submissions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{submittedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Graded</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{gradedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{submittedCount - gradedCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>Review and grade homework submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.map((submission) => (
                <div key={submission.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{submission.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{submission.homework}</p>
                      {submission.submittedDate ? (
                        <p className="text-xs text-green-600 mt-1">Submitted: {submission.submittedDate}</p>
                      ) : (
                        <p className="text-xs text-red-600 mt-1">Not submitted</p>
                      )}
                      {submission.feedback && (
                        <p className="text-sm text-gray-700 mt-2 p-2 bg-blue-50 rounded">
                          Feedback: {submission.feedback}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {submission.grade !== null ? (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{submission.grade}</p>
                          <p className="text-xs text-gray-500">Grade</p>
                        </div>
                      ) : submission.submittedDate ? (
                        <Button onClick={() => setGradingMode(submission.id)} size="sm">
                          Grade
                        </Button>
                      ) : null}
                    </div>
                  </div>

                  {gradingMode === submission.id && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Grade (0-100)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={gradeInput}
                          onChange={(e) => setGradeInput(e.target.value)}
                          className="w-full mt-1 p-2 border rounded text-sm"
                          placeholder="Enter grade"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-900">Feedback</label>
                        <textarea
                          value={feedbackInput}
                          onChange={(e) => setFeedbackInput(e.target.value)}
                          className="w-full mt-1 p-2 border rounded text-sm"
                          placeholder="Enter feedback"
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleGradeSubmission(submission.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Submit Grade
                        </Button>
                        <Button onClick={() => setGradingMode(null)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
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
        <h1 className="text-3xl font-bold text-gray-900">Homework</h1>
        <p className="text-gray-600 mt-1">View and submit your assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{submittedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>All homework assignments</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setFilterStatus("all")}
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
              >
                All
              </Button>
              <Button
                onClick={() => setFilterStatus("pending")}
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
              >
                Pending
              </Button>
              <Button
                onClick={() => setFilterStatus("submitted")}
                variant={filterStatus === "submitted" ? "default" : "outline"}
                size="sm"
              >
                Submitted
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredHomework.map((hw) => (
              <div key={hw.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{hw.title}</p>
                      {hw.status === "submitted" ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{hw.class}</p>
                    <p className="text-sm text-gray-500 mt-1">{hw.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Due: {hw.dueDate}</p>
                  </div>
                  {hw.status === "pending" && (
                    <Button onClick={() => setSelectedHomework(hw.id)} size="sm" className="gap-2">
                      <Upload className="w-4 h-4" />
                      Submit
                    </Button>
                  )}
                </div>
                {selectedHomework === hw.id && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Upload your submission</p>
                    <div className="flex gap-2">
                      <input type="file" className="flex-1 text-sm" />
                      <Button
                        onClick={() => handleSubmitHomework(hw.id)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
