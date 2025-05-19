"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"

export function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingBag className="h-6 w-6 text-black" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
