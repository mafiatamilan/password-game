"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { passwordRules } from "@/lib/password-rules"
import {
  LogOut,
  Clock,
  Trophy,
  CheckCircle,
  XCircle,
  Shield,
  User,
  Briefcase,
  Hash,
  Key,
  ChevronRight,
  AlertTriangle,
} from "lucide-react"

export default function GamePage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0)
  const [password, setPassword] = useState("")
  const [previousPasswords, setPreviousPasswords] = useState<string[]>([])
  const [error, setError] = useState("")
  const [failedRuleIndex, setFailedRuleIndex] = useState<number | null>(null)
  const [success, setSuccess] = useState(false)
  const [timer, setTimer] = useState(0)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [animation, setAnimation] = useState("")

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Timer
  useEffect(() => {
    if (!user || gameCompleted) return

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [user, gameCompleted])

  // Modified validation logic to check all rules up to the current one
  const validatePassword = (password: string, upToRuleIndex: number) => {
    for (let i = 0; i <= upToRuleIndex; i++) {
      if (!passwordRules[i].validator(password)) {
        return { valid: false, failedRuleIndex: i }
      }
    }
    return { valid: true, failedRuleIndex: null }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check all rules up to the current one
    const { valid, failedRuleIndex } = validatePassword(password, currentRuleIndex)

    if (valid) {
      // Calculate points - faster solutions get more points
      const basePoints = 100
      const timeDeduction = Math.min(timer, 60) // Cap time penalty at 60 seconds
      const pointsEarned = Math.max(basePoints - timeDeduction, 10)

      setScore((prev) => prev + pointsEarned)
      setSuccess(true)
      setError("")
      setFailedRuleIndex(null)
      setAnimation("success")

      // Store the successful password
      const newPreviousPasswords = [...previousPasswords]
      newPreviousPasswords[currentRuleIndex] = password
      setPreviousPasswords(newPreviousPasswords)

      // Reset timer for next challenge
      setTimer(0)

      // Move to next rule or end game
      setTimeout(() => {
        setSuccess(false)
        setAnimation("")

        if (currentRuleIndex === passwordRules.length - 1) {
          setGameCompleted(true)
        } else {
          setCurrentRuleIndex((prev) => prev + 1)
          // Don't clear the password since we need to keep building on it
        }
      }, 1500)
    } else {
      const failedRule = passwordRules[failedRuleIndex!]
      setError(`Your password doesn't meet Rule ${failedRuleIndex! + 1}: ${failedRule.description}`)
      setFailedRuleIndex(failedRuleIndex)
      setAnimation("error")
      setTimeout(() => setAnimation(""), 600)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-5 z-0"></div>
      <Card
        className={`w-full max-w-2xl backdrop-blur-sm bg-gray-900/80 border-cyan-900/30 shadow-2xl z-10 ${animation === "success" ? "animate-success" : animation === "error" ? "animate-error" : ""}`}
      >
        <CardHeader className="border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                The Password Game
              </CardTitle>
              <CardDescription className="text-gray-400">Create a password that meets all the rules</CardDescription>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="text-gray-400 hover:text-white hover:bg-gray-800">
              <LogOut className="h-5 w-5 mr-1" /> Logout
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2 px-4 shadow-inner">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-white font-bold text-lg">{score}</span>
              <span className="text-gray-400 text-sm">points</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2 px-4 shadow-inner">
              <Clock className="h-5 w-5 text-cyan-400" />
              <span className="text-white font-bold text-lg">{timer}</span>
              <span className="text-gray-400 text-sm">seconds</span>
            </div>
          </div>

          {gameCompleted ? (
            <div className="text-center py-12 px-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30 animate-float">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white glow-text">Game Completed! 🎉</h2>
              <p className="text-xl mb-8 text-gray-300">
                Your final score: <span className="text-yellow-400 font-bold">{score}</span>
              </p>
              <Button
                onClick={() => {
                  setCurrentRuleIndex(0)
                  setScore(0)
                  setTimer(0)
                  setPreviousPasswords([])
                  setPassword("")
                  setGameCompleted(false)
                }}
                className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white border-0 px-8 py-6 text-lg shadow-lg shadow-cyan-700/30 transition-all hover:scale-105"
              >
                Play Again
              </Button>
            </div>
          ) : (
            <>
              {/* Active Rules Section */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <h3 className="text-white font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    Active Rules ({currentRuleIndex + 1})
                  </h3>
                  <div className="h-1 flex-grow bg-gray-800 rounded-full overflow-hidden ml-3">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((currentRuleIndex + 1) / passwordRules.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {passwordRules.slice(0, currentRuleIndex + 1).map((rule, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-md text-sm ${
                        failedRuleIndex === index
                          ? "bg-red-900/30 border border-red-700/30 text-red-300"
                          : "bg-gray-800/30 border border-gray-700/30 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className={`mr-2 ${
                            failedRuleIndex === index
                              ? "bg-red-900/20 border-red-700/30 text-red-300"
                              : "bg-cyan-900/20 border-cyan-700/30 text-cyan-400"
                          }`}
                        >
                          {index + 1}
                        </Badge>
                        {rule.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Rule Announcement */}
              <div className="mb-6 p-5 bg-cyan-900/20 rounded-lg border border-cyan-700/30 shadow-inner">
                <div className="flex items-center mb-2">
                  <Badge variant="outline" className="bg-cyan-900/30 text-cyan-400 border-cyan-700/30 mr-2">
                    Rule {currentRuleIndex + 1} of {passwordRules.length}
                  </Badge>
                  <span className="text-cyan-400 text-sm">New Rule Added!</span>
                </div>
                <p className="text-lg text-white font-medium">{passwordRules[currentRuleIndex].description}</p>
              </div>

              {/* Previous Password Section */}
              {currentRuleIndex > 0 && previousPasswords[currentRuleIndex - 1] && (
                <div className="mb-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700">
                  <div className="flex items-center text-sm text-gray-400 mb-1">
                    <Key className="h-4 w-4 mr-1 text-gray-500" />
                    Previous Password:
                  </div>
                  <div className="flex items-center">
                    <code className="bg-gray-800 text-cyan-400 px-3 py-1.5 rounded font-mono text-sm flex-grow">
                      {previousPasswords[currentRuleIndex - 1]}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={() => setPassword(previousPasswords[currentRuleIndex - 1])}
                    >
                      <ChevronRight className="h-4 w-4" />
                      Use
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-700/30 text-red-300">
                  <XCircle className="h-5 w-5 mr-2" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 bg-green-900/20 border-green-700/30 text-green-300">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <AlertDescription>Correct! Adding next rule...</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter password that meets all rules"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-lg bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-700 pl-4 pr-4 py-6 shadow-inner"
                  />
                  {password && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {password.length} chars
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white border-0 py-6 text-lg shadow-lg shadow-cyan-900/30 transition-all hover:scale-[1.02]"
                >
                  Check Password
                </Button>
              </form>
            </>
          )}
        </CardContent>
        <CardFooter className="border-t border-gray-800 flex justify-between text-sm text-gray-400 py-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1 text-gray-500" />
            {user.name}
          </div>
          <div className="flex items-center">
            <Hash className="h-4 w-4 mr-1 text-gray-500" />
            {user.rollNumber}
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
            <span className="truncate max-w-[150px]">{user.department}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

