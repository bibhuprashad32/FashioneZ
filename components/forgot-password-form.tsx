"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

interface ForgotPasswordFormProps {
  onBackToLogin: () => void
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Simulate API call to send password reset email
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: `We've sent a password reset link to ${values.email}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to send reset link. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 pt-4">
      <Button type="button" variant="ghost" className="p-0 h-auto mb-2" onClick={onBackToLogin}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to login
      </Button>

      {isSubmitted ? (
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
          </p>
          <Button onClick={onBackToLogin} className="w-full">
            Return to Login
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
