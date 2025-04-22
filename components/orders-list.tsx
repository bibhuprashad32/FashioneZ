"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Sample orders data
const initialOrders = [
  {
    id: "ORD001",
    date: "2023-04-20",
    amount: 3798,
    status: "confirmed",
    paymentStatus: "verified",
    items: [
      { id: "1", name: "Classic White Shirt", price: 1299, quantity: 1 },
      { id: "3", name: "Denim Jacket", price: 2499, quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    date: "2023-04-19",
    amount: 4598,
    status: "pending",
    paymentStatus: "failed",
    items: [
      { id: "2", name: "Floral Summer Dress", price: 1899, quantity: 1 },
      { id: "6", name: "Designer Handbag", price: 2699, quantity: 1 },
    ],
  },
  {
    id: "ORD003",
    date: "2023-04-18",
    amount: 2598,
    status: "cancelled",
    paymentStatus: "failed",
    items: [
      { id: "4", name: "Casual Sneakers", price: 1599, quantity: 1 },
      { id: "12", name: "Stylish Sunglasses", price: 999, quantity: 1 },
    ],
  },
]

export function OrdersList() {
  const [orders] = useState(initialOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId))
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success"
      case "pending":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "success"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
        <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <div
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:bg-muted/50"
            onClick={() => toggleOrderDetails(order.id)}
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{order.id}</h3>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)}>
                    Payment {order.paymentStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString()} • {formatPrice(order.amount)}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              {order.status === "pending" && order.paymentStatus === "failed" && (
                <Button size="sm" className="mr-4">
                  Retry Payment
                </Button>
              )}
              {expandedOrder === order.id ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>

          {expandedOrder === order.id && (
            <CardContent className="border-t pt-4 pb-2">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(order.amount)}</span>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
