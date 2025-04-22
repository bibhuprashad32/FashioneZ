"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(10, { message: "Please enter your full address" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  state: z.string().min(2, { message: "Please enter your state" }),
  pincode: z.string().min(6, { message: "Please enter a valid pincode" }),
  utrNumber: z.string().optional(),
})

export function PaymentForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"details" | "payment" | "verification">("details")
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      utrNumber: "",
    },
  })

  const onSubmitDetails = () => {
    setPaymentStep("payment")
  }

  const onSubmitPayment = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      // Simulate API call to submit order
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and is pending verification.",
      })

      // Redirect to order confirmation page
      router.push("/orders")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to place your order. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        {paymentStep === "details" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitDetails)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your full address" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full mt-2">
                  Continue to Payment
                </Button>
              </form>
            </Form>
          </>
        )}

        {paymentStep === "payment" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Payment</h3>
              <Button variant="ghost" onClick={() => setPaymentStep("details")} className="h-8 text-xs">
                Back to Details
              </Button>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-2">UPI Payment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Scan the QR code below with any UPI app to make the payment.
                </p>
                <div className="flex justify-center mb-4">
                  <div className="relative w-48 h-48 border rounded-lg overflow-hidden">
                    <Image src="/placeholder.svg" alt="UPI QR Code" fill className="object-contain p-2" />
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground">UPI ID: fashionez@ybl</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitPayment)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="utrNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTR Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter UTR number after payment" {...field} />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground mt-1">
                          You'll receive the UTR number after completing the payment.
                        </p>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Verify Payment & Place Order"}
                  </Button>
                </form>
              </Form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
