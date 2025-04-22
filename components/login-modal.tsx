"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setShowForgotPassword(false)
  }

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true)
  }

  const handleBackToLogin = () => {
    setShowForgotPassword(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {showForgotPassword ? "Reset Password" : activeTab === "login" ? "Login to FashioneZ" : "Create an Account"}
          </DialogTitle>
        </DialogHeader>

        {showForgotPassword ? (
          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onForgotPasswordClick={handleForgotPasswordClick} onSuccess={onClose} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm onSuccess={() => handleTabChange("login")} />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
