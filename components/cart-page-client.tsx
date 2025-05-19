"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useEffect, useState } from "react"

export function CartPageClient() {
  const { items, removeItem, updateQuantity, itemCount, totalPrice } = useCart()
  const [mounted, setMounted] = useState(false)

  // Only render on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <h1 className="text-center text-2xl font-semibold text-black">Your Cart</h1>
          <p className="text-center text-gray-600">Loading your cart...</p>
        </div>
      </div>
    )
  }

  // Default to 0 if totalPrice is undefined
  const safeTotal = totalPrice || 0

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pb-16">
      <h1 className="text-2xl font-light text-black text-center mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg?height=96&width=96"}
                            alt={item.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-black">
                              <h3>{item.name}</h3>
                              <p className="ml-4">
                                ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border border-gray-200 rounded-sm">
                              <button
                                className="p-2 text-black hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                                <span className="sr-only">Decrease quantity</span>
                              </button>
                              <span className="px-4 py-2 text-black">{item.quantity}</span>
                              <button
                                className="p-2 text-black hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Increase quantity</span>
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-black hover:text-gray-600 flex items-center"
                                onClick={() => removeItem(item.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
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
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-black mb-4">Your cart is empty.</p>
              <Link
                href="/"
                className="inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-black mb-4">Order Summary</h2>
            <div className="flow-root">
              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between text-base text-black">
                  <p>Subtotal</p>
                  <p>${safeTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base text-black mt-2">
                  <p>Shipping</p>
                  <p>Calculated at checkout</p>
                </div>
              </div>
              <div className="flex justify-between text-base font-medium text-black mt-4">
                <p>Total</p>
                <p>${safeTotal.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <Link
                  href="/checkout"
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-sm shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 ${
                    itemCount === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-disabled={itemCount === 0}
                  onClick={(e) => itemCount === 0 && e.preventDefault()}
                >
                  Proceed to Checkout
                </Link>
              </div>
              <div className="mt-4 text-center">
                <Link href="/" className="text-sm text-black hover:text-gray-600">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
