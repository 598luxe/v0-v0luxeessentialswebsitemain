"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Default to 0 if totalPrice is undefined
  const safeTotal = totalPrice || 0

  const handlePlaceOrder = () => {
    // In a real app, you would process payment here
    clearCart()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-black mb-8">Your order has been placed successfully.</p>
        <Link
          href="/"
          className="inline-block bg-black text-white py-2 px-6 rounded-sm hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pb-16">
      <h1 className="text-2xl font-light text-black text-center mb-6">Checkout</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-black mb-4">Your cart is empty. Add some products before checking out.</p>
          <Link
            href="/"
            className="inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-black mb-4">Shipping Information</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-black mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-black mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-black mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-black mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-black mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-lg font-medium text-black mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="creditCard"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                    defaultChecked
                  />
                  <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-black">
                    Credit Card
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-black">
                    PayPal
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-black mb-4">Order Summary</h2>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="flex-1 ml-3">
                        <p className="text-sm font-medium text-black">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-black">${(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-sm text-black">
                    <p>Subtotal</p>
                    <p>${safeTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-black mt-2">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-black mt-2">
                    <p>Total</p>
                    <p>${safeTotal.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
