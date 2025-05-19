"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import type { Product } from "@/app/data/products"
import { cn } from "@/lib/utils"

interface WishlistToggleButtonProps {
  product: Product
  className?: string
  iconOnly?: boolean
}

export function WishlistToggleButton({ product, className, iconOnly = false }: WishlistToggleButtonProps) {
  const { isInWishlist, toggleItem } = useWishlist()
  const [mounted, setMounted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (mounted) {
      setInWishlist(isInWishlist(product.id))
    }
  }, [isInWishlist, product.id, mounted])

  const handleToggleWishlist = () => {
    setIsAdding(true)
    toggleItem(product)

    // Update local state immediately for better UX
    setInWishlist(!inWishlist)

    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  if (!mounted) return null

  if (iconOnly) {
    return (
      <button
        onClick={handleToggleWishlist}
        className={cn(
          "p-2 border border-gray-300 rounded-md transition-colors",
          inWishlist ? "bg-pink-50 border-pink-200" : "hover:bg-gray-100",
          className,
        )}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={20} className={inWishlist ? "text-red-500 fill-red-500" : "text-gray-600"} />
      </button>
    )
  }

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isAdding}
      className={cn(
        "flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors",
        inWishlist
          ? "bg-pink-100 text-red-600 hover:bg-pink-200 border border-pink-200"
          : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-300",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5", inWishlist ? "text-red-500 fill-red-500" : "text-gray-600")} />
      {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
    </button>
  )
}
