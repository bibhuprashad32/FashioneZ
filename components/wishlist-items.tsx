"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Sample wishlist items data
const initialWishlistItems = [
  {
    id: "2",
    name: "Floral Summer Dress",
    brand: "Elegance",
    price: 1899,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Slim Fit Chinos",
    brand: "FashioneZ Essentials",
    price: 1499,
    image: "/placeholder.svg",
  },
  {
    id: "8",
    name: "Casual Jeans",
    brand: "Urban Style",
    price: 1799,
    image: "/placeholder.svg",
  },
]

export function WishlistItems() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const { toast } = useToast()

  const removeItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist",
    })
  }

  const moveToCart = (id: string) => {
    // In a real app, this would add the item to the cart
    // and then remove it from the wishlist
    toast({
      title: "Added to cart",
      description: "The item has been moved to your cart",
    })
    removeItem(id)
  }

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-4">Looks like you haven't added anything to your wishlist yet.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistItems.map((item) => (
        <div key={item.id} className="group relative overflow-hidden rounded-lg border bg-background">
          <Link href={`/product/${item.id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.brand}</p>
              <p className="mt-2 font-semibold">{formatPrice(item.price)}</p>
            </div>
          </Link>
          <div className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm" className="w-[48%]" onClick={() => moveToCart(item.id)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="sm" className="w-[48%]" onClick={() => removeItem(item.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
