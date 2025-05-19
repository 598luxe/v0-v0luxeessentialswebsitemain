"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useEffect, useState } from "react"

export function CartIcon() {
  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    setMounted(true)
    if (cart && typeof cart.itemCount === "number") {
      setItemCount(cart.itemCount)
    }
  }, [cart, cart?.itemCount])

  if (!mounted) {
    return (
      <Link href="/cart" className="relative p-2">
        <ShoppingBag className="h-6 w-6 text-black" />
      </Link>
    )
  }

  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingBag className="h-6 w-6 text-black" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      <span className="sr-only">Cart with {itemCount} items</span>
    </Link>
  )
}
