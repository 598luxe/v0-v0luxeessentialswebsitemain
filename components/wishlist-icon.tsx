"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import Link from "next/link"
import { useEffect, useState } from "react"

export function WishlistIcon() {
  const wishlist = useWishlist()
  const [mounted, setMounted] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setMounted(true)
    if (wishlist && typeof wishlist.itemCount === "number") {
      setItemCount(wishlist.itemCount)
    }
  }, [wishlist, wishlist?.itemCount])

  if (!mounted) {
    return (
      <Link href="/wishlist" className="relative p-2">
        <Heart className="h-6 w-6 text-black" />
      </Link>
    )
  }

  return (
    <Link href="/wishlist" className="relative p-2">
      <Heart className="h-6 w-6 text-black" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      <span className="sr-only">Wishlist with {itemCount} items</span>
    </Link>
  )
}
