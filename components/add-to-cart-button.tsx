"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/app/data/products"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Convert price to number if it's a string
    const price =
      typeof product.price === "string" ? Number.parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0 : product.price

    addItem({
      id: product.id,
      name: product.name,
      price: price,
      image: product.image || "/placeholder.svg",
      quantity: 1,
    })

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-sm font-medium transition-colors ${
        isAdding ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {isAdding ? (
        "Added!"
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </>
      )}
    </button>
  )
}
