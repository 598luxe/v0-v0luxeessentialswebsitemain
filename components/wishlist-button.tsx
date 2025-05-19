"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/app/data/products"

interface WishlistButtonProps {
  product: Product
  variant?: "default" | "outline" | "ghost"
}

export function WishlistButton({ product, variant = "outline" }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist()

  const inWishlist = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addItem(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <Button variant={variant} size="icon" onClick={toggleWishlist} className={inWishlist ? "text-red-500" : ""}>
      <Heart className="h-5 w-5" fill={inWishlist ? "currentColor" : "none"} />
      <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
    </Button>
  )
}
