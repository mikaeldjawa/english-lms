"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload, FileText, Trash2 } from "lucide-react"

const MATERIALS_DATA = [
  {
    id: 1,
    title: "Unit 1: Introduction to English",
    class: "English 101",
    week: "Week 1",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Ms. Sarah",
    date: "2024-10-15",
  },
  {
    id: 2,
    title: "Unit 2: Grammar Basics",
    class: "English 101",
    week: "Week 2",
    type: "PDF",
    size: "3.1 MB",
    uploadedBy: "Ms. Sarah",
    date: "2024-10-18",
  },
  {
    id: 3,
    title: "Vocabulary List - Unit 1",
    class: "English 102",
    week: "Week 1",
    type: "DOCX",
    size: "1.2 MB",
    uploadedBy: "Mr. John",
    date: "2024-10-16",
  },
  {
    id: 4,
    title: "Speaking Practice Audio",
    class: "English 103",
    week: "Week 2",
    type: "MP3",
    size: "5.8 MB",
    uploadedBy: "Ms. Emma",
    date: "2024-10-19",
  },
]

export default function MaterialsPage({ user }) {
  const [materials, setMaterials] = useState(MATERIALS_DATA)
  const [selectedClass, setSelectedClass] = useState("English 101")
  const [showUploadForm, setShowUploadForm] = useState(false)

  const filteredMaterials = materials.filter((m) => m.class === selectedClass)

  const handleDeleteMaterial = (id) => {
    setMaterials(materials.filter((m) => m.id !== id))
  }

  const handleUploadMaterial = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newMaterial = {
      id: materials.length + 1,
      title: formData.get("title"),
      class: selectedClass,
      week: formData.get("week"),
      type: "PDF",
      size: "0 MB",
      uploadedBy: user.name,
      date: new Date().toISOString().split("T")[0],
    }
    setMaterials([...materials, newMaterial])
    setShowUploadForm(false)
    e.target.reset()
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lesson Materials</h1>
        <p className="text-gray-600 mt-1">
          {user.role === "teacher" ? "Upload and manage lesson materials" : "Download lesson materials and resources"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Class Materials</CardTitle>
              <CardDescription>Select a class to view materials</CardDescription>
            </div>
            {user.role === "teacher" && (
              <Button onClick={() => setShowUploadForm(!showUploadForm)} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Material
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {user.role === "teacher" && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["English 101", "English 102", "English 103"].map((cls) => (
                <Button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  variant={selectedClass === cls ? "default" : "outline"}
                  className="whitespace-nowrap"
                >
                  {cls}
                </Button>
              ))}
            </div>
          )}

          {showUploadForm && user.role === "teacher" && (
            <form
              onSubmit={handleUploadMaterial}
              className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Material Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Unit 1: Introduction"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Week</label>
                <input
                  type="text"
                  name="week"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Week 1"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Upload
                </Button>
                <Button type="button" onClick={() => setShowUploadForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <div key={material.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{material.title}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                          <p>{material.week}</p>
                          <p>{material.size}</p>
                          <p>Type: {material.type}</p>
                          <p>By: {material.uploadedBy}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{material.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      {user.role === "teacher" && (
                        <Button
                          onClick={() => handleDeleteMaterial(material.id)}
                          variant="destructive"
                          size="sm"
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No materials available for this class</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
