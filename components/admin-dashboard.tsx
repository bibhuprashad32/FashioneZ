"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample pending orders data
const initialOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    date: "2023-04-20",
    amount: 3798,
    utrNumber: "UTR123456789",
    status: "pending",
    items: [
      { id: "1", name: "Classic White Shirt", price: 1299, quantity: 1 },
      { id: "3", name: "Denim Jacket", price: 2499, quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    date: "2023-04-19",
    amount: 4598,
    utrNumber: "UTR987654321",
    status: "pending",
    items: [
      { id: "2", name: "Floral Summer Dress", price: 1899, quantity: 1 },
      { id: "6", name: "Designer Handbag", price: 2699, quantity: 1 },
    ],
  },
  {
    id: "ORD003",
    customerName: "Mike Johnson",
    date: "2023-04-18",
    amount: 2598,
    utrNumber: "UTR456789123",
    status: "pending",
    items: [
      { id: "4", name: "Casual Sneakers", price: 1599, quantity: 1 },
      { id: "12", name: "Stylish Sunglasses", price: 999, quantity: 1 },
    ],
  },
]

export function AdminDashboard() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const { toast } = useToast()

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleVerify = (orderId: string, status: "accepted" | "rejected") => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))

    toast({
      title: `Order ${status}`,
      description: `Order #${orderId} has been ${status}`,
    })

    setSelectedOrder(null)
  }

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrder((prev) => (prev === orderId ? null : orderId))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage and verify pending orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
          <CardDescription>Review and verify payment for pending orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>UTR Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <>
                  <TableRow
                    key={order.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{formatPrice(order.amount)}</TableCell>
                    <TableCell>{order.utrNumber}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "accepted"
                            ? "success"
                            : order.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleVerify(order.id, "accepted")
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleVerify(order.id, "rejected")
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>

                  {selectedOrder === order.id && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/30">
                        <div className="py-2">
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
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}

              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No pending orders to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
