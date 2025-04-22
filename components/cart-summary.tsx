"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export function CartSummary() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  // Sample cart summary data
  const subtotal = 3798
  const shipping = 0
  const total = subtotal + shipping

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to proceed to checkout",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/checkout")
    }, 1000)
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Including all taxes</p>
          </div>
        </div>
        <Button className="w-full mt-6" onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  )
}
