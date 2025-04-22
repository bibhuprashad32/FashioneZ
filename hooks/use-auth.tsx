"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()

      // For demo purposes, we'll create a mock user if API is not available
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: email,
        phone: "1234567890",
      }

      setUser(data.user || mockUser)
      localStorage.setItem("user", JSON.stringify(data.user || mockUser))
      localStorage.setItem("token", data.token || "mock-jwt-token")
    } catch (error) {
      console.error("Login error:", error)
      // For demo, we'll allow login with any credentials
      if (process.env.NODE_ENV === "development") {
        const mockUser = {
          id: "1",
          name: "John Doe",
          email: email,
          phone: "1234567890",
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        localStorage.setItem("token", "mock-jwt-token")
      } else {
        throw error
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      })

      if (!response.ok) {
        throw new Error("Signup failed")
      }

      // For demo purposes, we'll just return success
      return
    } catch (error) {
      console.error("Signup error:", error)
      // For demo, we'll allow signup without API
      if (process.env.NODE_ENV === "development") {
        return
      } else {
        throw error
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
