"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { AddToCartButton } from "./add-to-cart-button"
import { WishlistToggleButton } from "./wishlist-toggle-button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/app/data/products"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products found.</p>
      </div>
    )
  }

  const formatPrice = (price: number | string) => {
    // Convert string to number if it's a string
    const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price

    // Check if the price is a valid number
    if (isNaN(numericPrice)) {
      return "$0.00"
    }

    // Format the price with 2 decimal places
    return `$${numericPrice.toFixed(2)}`
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="p-4">
            <Link href={`/product/${product.id}`} className="block">
              <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
              <p className="text-xl font-bold text-black">{formatPrice(product.price)}</p>
            </Link>

            <div className="mt-4 flex space-x-2">
              <AddToCartButton product={product} />
              <WishlistToggleButton product={product} iconOnly />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
