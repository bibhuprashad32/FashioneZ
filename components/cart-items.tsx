"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

// Sample cart items data
const initialCartItems = [
  {
    id: "1",
    name: "Classic White Shirt",
    brand: "FashioneZ Essentials",
    price: 1299,
    image: "/placeholder.svg",
    size: "M",
    quantity: 1,
  },
  {
    id: "3",
    name: "Denim Jacket",
    brand: "Urban Style",
    price: 2499,
    image: "/placeholder.svg",
    size: "L",
    quantity: 1,
  },
]

export function CartItems() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const { toast } = useToast()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (cartItems.length === 0) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-4">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-0">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>
        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
              <div className="col-span-1 md:col-span-2">
                <div className="aspect-square relative rounded-md overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
              </div>
              <div className="col-span-1 md:col-span-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.brand}</p>
                <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                <div className="md:hidden mt-2 flex justify-between items-center">
                  <span className="text-sm">Price: {formatPrice(item.price)}</span>
                  <span className="text-sm">Total: {formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
              <div className="hidden md:block md:col-span-2 text-center">{formatPrice(item.price)}</div>
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                    className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="hidden md:block md:col-span-2 text-right">{formatPrice(item.price * item.quantity)}</div>
              <div className="col-span-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
