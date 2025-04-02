"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LockKeyhole, User, Hash } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!formData.name || !formData.rollNumber || !formData.department) {
      setError("All fields are required")
      return
    }

    // Login the user
    login(formData)
    router.push("/game")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="w-full max-w-md z-10 p-4">
        <Card className="backdrop-blur-sm bg-gray-900/80 border-cyan-900/30 shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-lg">
                <LockKeyhole className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Password Challenge</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your details to start the game
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber" className="text-gray-300">
                  Roll Number
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input
                    id="rollNumber"
                    name="rollNumber"
                    placeholder="Enter your roll number"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-300">
                  Department
                </Label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled className="bg-gray-800 text-white">
                    Select your department
                  </option>
                  <option value="B.E. Aeronautical Engineering" className="bg-gray-800 text-white">
                    B.E. Aeronautical Engineering
                  </option>
                  <option value="B.E. Automobile Engineering" className="bg-gray-800 text-white">
                    B.E. Automobile Engineering
                  </option>
                  <option value="B.E. BioMedical Engineering" className="bg-gray-800 text-white">
                    B.E. BioMedical Engineering
                  </option>
                  <option value="B.E. Civil Engineering" className="bg-gray-800 text-white">
                    B.E. Civil Engineering
                  </option>
                  <option value="B.E. Computer Science & Design" className="bg-gray-800 text-white">
                    B.E. Computer Science & Design
                  </option>
                  <option value="B.E. Computer Science & Engineering" className="bg-gray-800 text-white">
                    B.E. Computer Science & Engineering
                  </option>
                  <option
                    value="B.E. Computer Science & Engineering (Cyber Security)"
                    className="bg-gray-800 text-white"
                  >
                    B.E. Computer Science & Engineering (Cyber Security)
                  </option>
                  <option value="B.E. Electrical & Electronics Engineering" className="bg-gray-800 text-white">
                    B.E. Electrical & Electronics Engineering
                  </option>
                  <option value="B.E. Electronics & Communication Engineering" className="bg-gray-800 text-white">
                    B.E. Electronics & Communication Engineering
                  </option>
                  <option value="B.E. Mechanical Engineering" className="bg-gray-800 text-white">
                    B.E. Mechanical Engineering
                  </option>
                  <option value="B.E. Mechatronics Engineering" className="bg-gray-800 text-white">
                    B.E. Mechatronics Engineering
                  </option>
                  <option value="B.E. Robotics and Automation" className="bg-gray-800 text-white">
                    B.E. Robotics and Automation
                  </option>
                  <option value="B.Tech. Artificial Intelligence & Data Science" className="bg-gray-800 text-white">
                    B.Tech. Artificial Intelligence & Data Science
                  </option>
                  <option value="B.Tech. Artificial Intelligence & Machine Learning" className="bg-gray-800 text-white">
                    B.Tech. Artificial Intelligence & Machine Learning
                  </option>
                  <option value="B.Tech. Bio Technology" className="bg-gray-800 text-white">
                    B.Tech. Bio Technology
                  </option>
                  <option value="B.Tech. Chemical Engineering" className="bg-gray-800 text-white">
                    B.Tech. Chemical Engineering
                  </option>
                  <option value="B.Tech. Computer Science and Business Systems" className="bg-gray-800 text-white">
                    B.Tech. Computer Science and Business Systems
                  </option>
                  <option value="B.Tech. Food Technology" className="bg-gray-800 text-white">
                    B.Tech. Food Technology
                  </option>
                  <option value="B.Tech. Information Technology" className="bg-gray-800 text-white">
                    B.Tech. Information Technology
                  </option>
                </select>
              </div>
              {error && <p className="text-sm font-medium text-red-400">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white border-0"
              >
                Start Game
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-xs text-gray-500">
            Test your password creation skills with challenging rules
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

