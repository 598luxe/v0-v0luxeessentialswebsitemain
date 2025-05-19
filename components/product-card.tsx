"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/app/data/products"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const [imageError, setImageError] = useState(false)

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
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
  }

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="group relative overflow-hidden rounded-md border bg-background">
      <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">{product.name}</span>
          </div>
        ) : (
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
        )}

        {product.sale && (
          <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
            SALE
          </span>
        )}

        {product.new && (
          <span className="absolute right-2 top-2 rounded bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
            NEW
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center justify-between">
          <div>
            <span className="font-medium">{product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">{product.originalPrice}</span>
            )}
          </div>
          {product.stock !== undefined && product.stock <= 3 && (
            <span className="text-xs text-red-600">Only {product.stock} left!</span>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-between bg-background p-4 transition-transform duration-300 group-hover:translate-y-0">
        <Button variant="default" size="sm" className="flex-1 mr-2" onClick={handleAddToCart}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          variant={inWishlist ? "destructive" : "outline"}
          size="icon"
          className="h-9 w-9"
          onClick={toggleWishlist}
        >
          <Heart className="h-4 w-4" fill={inWishlist ? "currentColor" : "none"} />
          <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
        </Button>
      </div>
    </div>
  )
}
