"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle, Search } from "lucide-react"

const ANNOUNCEMENTS = [
  {
    id: 1,
    author: "Ms. Sarah",
    title: "Class Rescheduled",
    message: "English 101 will be held on Friday instead of Thursday this week.",
    date: "2 hours ago",
    type: "announcement",
    category: "schedule",
  },
  {
    id: 2,
    author: "Admin",
    title: "New Materials Available",
    message: "Check the materials section for the latest lesson resources.",
    date: "1 day ago",
    type: "announcement",
    category: "resources",
  },
  {
    id: 3,
    author: "Mr. John",
    title: "Homework Deadline Extended",
    message: "The grammar exercise deadline has been extended to next Monday.",
    date: "2 days ago",
    type: "announcement",
    category: "homework",
  },
]

const DISCUSSIONS = [
  {
    id: 1,
    title: "Best way to improve speaking skills?",
    author: "John Student",
    replies: 5,
    lastReply: "1 hour ago",
    category: "tips",
  },
  {
    id: 2,
    title: "Vocabulary learning strategies",
    author: "Emma Wilson",
    replies: 8,
    lastReply: "30 minutes ago",
    category: "tips",
  },
  {
    id: 3,
    title: "Essay writing tips for beginners",
    author: "Ms. Sarah",
    replies: 12,
    lastReply: "2 hours ago",
    category: "tips",
  },
]

const DIRECT_MESSAGES = [
  {
    id: 1,
    name: "Ms. Sarah",
    lastMessage: "John is doing great in class!",
    time: "10:30 AM",
    unread: false,
    role: "teacher",
  },
  {
    id: 2,
    name: "Mr. John",
    lastMessage: "Please remind John about the homework...",
    time: "9:15 AM",
    unread: true,
    role: "teacher",
  },
  {
    id: 3,
    name: "Ms. Emma",
    lastMessage: "John's speaking skills are improving!",
    time: "Yesterday",
    unread: false,
    role: "teacher",
  },
  {
    id: 4,
    name: "Emma Wilson",
    lastMessage: "Want to study together?",
    time: "Yesterday",
    unread: false,
    role: "student",
  },
]

export default function CommunicationPage({ user }) {
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS)
  const [discussions, setDiscussions] = useState(DISCUSSIONS)
  const [messages, setMessages] = useState(DIRECT_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [activeTab, setActiveTab] = useState("announcements")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "other", text: "Hi! How is John doing in class?" },
    { id: 2, sender: "user", text: "He's doing great! Thanks for asking." },
  ])

  const handlePostMessage = () => {
    if (newMessage.trim()) {
      const newAnnouncement = {
        id: announcements.length + 1,
        author: user.name,
        title: "New Message",
        message: newMessage,
        date: "just now",
        type: "message",
        category: "general",
      }
      setAnnouncements([newAnnouncement, ...announcements])
      setNewMessage("")
    }
  }

  const handleStartDiscussion = () => {
    if (newMessage.trim()) {
      const newDiscussion = {
        id: discussions.length + 1,
        title: newMessage,
        author: user.name,
        replies: 0,
        lastReply: "just now",
        category: "general",
      }
      setDiscussions([newDiscussion, ...discussions])
      setNewMessage("")
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { id: chatMessages.length + 1, sender: "user", text: newMessage }])
      setNewMessage("")
    }
  }

  const filteredAnnouncements =
    selectedCategory === "all"
      ? announcements.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : announcements.filter(
        (a) => a.category === selectedCategory && a.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )

  const filteredDiscussions = discussions.filter((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const unreadCount = messages.filter((m) => m.unread).length

  const filteredMessages = user.role === "parent" ? messages.filter((m) => m.role === "teacher") : messages

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Communication Board</h1>
        <p className="text-gray-600 mt-1">
          {user.role === "parent"
            ? "Connect with your child's teachers"
            : "Announcements, discussions, and direct messages"}
        </p>
      </div>

      <div className="flex gap-2 border-b">
        {user.role !== "parent" && (
          <>
            <Button
              onClick={() => setActiveTab("announcements")}
              variant={activeTab === "announcements" ? "default" : "ghost"}
              className="rounded-none border-b-2"
            >
              Announcements
            </Button>
            <Button
              onClick={() => setActiveTab("discussions")}
              variant={activeTab === "discussions" ? "default" : "ghost"}
              className="rounded-none border-b-2"
            >
              Discussions
            </Button>
          </>
        )}
        <Button
          onClick={() => setActiveTab("messages")}
          variant={activeTab === "messages" ? "default" : "ghost"}
          className="rounded-none border-b-2 gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          {user.role === "parent" ? "Teachers" : "Messages"}
          {unreadCount > 0 && (
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </Button>
      </div>

      {activeTab === "announcements" && user.role !== "parent" && (
        <div className="space-y-6">
          {user.role !== "parent" && (
            <Card>
              <CardHeader>
                <CardTitle>Post an Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Share an announcement or message..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <Button onClick={handlePostMessage} className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Latest updates from the school</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedCategory("all")}
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => setSelectedCategory("schedule")}
                    variant={selectedCategory === "schedule" ? "default" : "outline"}
                    size="sm"
                  >
                    Schedule
                  </Button>
                  <Button
                    onClick={() => setSelectedCategory("homework")}
                    variant={selectedCategory === "homework" ? "default" : "outline"}
                    size="sm"
                  >
                    Homework
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 outline-none text-sm"
                />
              </div>
              <div className="space-y-4">
                {filteredAnnouncements.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${item.type === "announcement" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                              }`}
                          >
                            {item.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">By {item.author}</p>
                        <p className="text-gray-700 mt-2">{item.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "discussions" && user.role !== "parent" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Start a Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="What would you like to discuss?"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <Button onClick={handleStartDiscussion} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="w-4 h-4" />
                  Start Discussion
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discussion Threads</CardTitle>
              <CardDescription>Community discussions and Q&A</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredDiscussions.map((discussion) => (
                  <div key={discussion.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{discussion.title}</p>
                        <p className="text-sm text-gray-600 mt-1">Started by {discussion.author}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>{discussion.replies} replies</span>
                          <span>Last reply {discussion.lastReply}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "messages" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{user.role === "parent" ? "Teachers" : "Direct Messages"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg.id)}
                    className={`p-3 rounded-lg cursor-pointer transition ${selectedMessage === msg.id
                        ? "bg-blue-100 border border-blue-300"
                        : "hover:bg-gray-100 border border-transparent"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{msg.name}</p>
                      {msg.unread && <div className="w-2 h-2 bg-red-600 rounded-full" />}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">{msg.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedMessage
                  ? filteredMessages.find((m) => m.id === selectedMessage)?.name
                  : "Select a conversation"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4">
                  <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`p-3 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                            }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={handleSendMessage} className="gap-2">
                      <Send className="w-4 h-4" />
                      Send
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Select a conversation to start messaging</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
