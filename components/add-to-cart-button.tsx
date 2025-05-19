"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import type { Product } from "@/app/data/products"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Convert string price to number
    const numericPrice =
      typeof product.price === "string" ? Number.parseFloat(product.price.replace(/[^0-9.]/g, "")) : product.price

    // Add item to cart
    addItem({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image || "/placeholder.svg?height=400&width=400",
      quantity: 1,
    })

    // Show added animation
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
      disabled={isAdding}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {isAdding ? "Added!" : "Add to Cart"}
    </Button>
  )
}
