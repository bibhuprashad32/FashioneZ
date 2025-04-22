"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your wishlist",
        variant: "destructive",
      })
      return
    }

    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? `${product.name} has been removed from your wishlist`
        : `${product.name} has been added to your wishlist`,
    })
  }

  // Format price to Indian Rupees
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm dark:bg-black/70"
            onClick={handleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <p className="mt-2 font-semibold">{formattedPrice}</p>
        </div>
      </Link>
    </div>
  )
}
