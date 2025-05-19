"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/app/data/products"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"

interface ProductGridProps {
  products: Product[]
  columns?: number
}

export function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const { addToCart } = useCart()
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const columnClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns]

  if (!products || products.length === 0) {
    return <div className="text-center py-10 text-black">No products found.</div>
  }

  return (
    <div className={`grid ${columnClass} gap-6`}>
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <Link href={`/product/${product.id}`} className="block relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {product.sale && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
            {product.new && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
          </Link>

          <div className="p-4">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-lg font-medium text-black mb-1 hover:underline">{product.name}</h3>
            </Link>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-black font-bold">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through ml-2 text-sm">{product.originalPrice}</span>
                )}
              </div>
              {product.stock !== undefined && product.stock <= 3 && (
                <span className="text-red-500 text-xs">Only {product.stock} left!</span>
              )}
            </div>

            {/* Color options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-2 flex gap-1">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick action buttons */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white p-3 flex gap-2 transition-all duration-300 ${
              hoveredProduct === product.id ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-black border-black hover:bg-black hover:text-white"
              onClick={(e) => {
                e.preventDefault()
                addToCart(product)
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="text-black border-black hover:bg-black hover:text-white">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
