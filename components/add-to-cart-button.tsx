"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/app/data/products"

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)

    try {
      // Convert price to number if it's a string
      const price =
        typeof product.price === "string" ? Number.parseFloat(product.price.replace(/[^0-9.]/g, "")) : product.price

      addItem({
        id: product.id,
        name: product.name,
        price: price || 0,
        image: product.image,
        quantity: 1,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)

      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive",
      })
    }

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding} className={className}>
      {isAdding ? (
        "Added!"
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
