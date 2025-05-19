"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { PaymentMethods } from "@/components/payment-methods"

export default function CartPage() {
  const { items, removeItem, updateQuantity, itemCount, totalPrice, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <div className="flow-root">
                <ul className="-my-6 divide-y">
                  {items.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3>{item.name}</h3>
                            <p className="ml-4">
                              ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border rounded">
                            <button
                              className="p-2 hover:bg-muted"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                              <span className="sr-only">Decrease quantity</span>
                            </button>
                            <span className="px-4 py-2">{item.quantity}</span>
                            <button
                              className="p-2 hover:bg-muted"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Increase quantity</span>
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primary/80 flex items-center"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="flow-root">
              <div className="border-t border-b py-4">
                <div className="flex justify-between text-base">
                  <p>Subtotal</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base mt-2">
                  <p>Shipping</p>
                  <p>Calculated at checkout</p>
                </div>
              </div>
              <div className="flex justify-between text-base font-medium mt-4">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-base font-medium">Payment Method</h3>
                <PaymentMethods />

                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </div>

              <div className="mt-4 text-center">
                <Link href="/shop" className="text-sm text-primary hover:text-primary/80">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
