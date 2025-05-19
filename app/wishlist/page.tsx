"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { toast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
        <p>Loading...</p>
      </div>
    )
  }

  const handleAddToCart = (product: any) => {
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

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeItem(id)

    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-6">Your wishlist is empty.</p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <Button variant="outline" size="sm" onClick={clearWishlist}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Wishlist
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => (
              <div key={product.id} className="relative rounded-md border bg-background">
                <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </Link>

                <div className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium">{product.name}</h3>
                  </Link>
                  <div className="mt-1">
                    <span className="font-medium">{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="default" size="sm" className="flex-1" onClick={() => handleAddToCart(product)}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                    >
                      <Heart className="h-4 w-4" fill="currentColor" />
                      <span className="sr-only">Remove from wishlist</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
