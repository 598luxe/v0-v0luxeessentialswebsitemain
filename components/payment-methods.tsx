"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type PaymentMethod = {
  id: string
  name: string
  icon: string
  type: "card" | "bnpl" | "wallet"
}

const paymentMethods: PaymentMethod[] = [
  // Credit/Debit Cards
  {
    id: "visa",
    name: "Visa",
    icon: "/placeholder.svg?height=40&width=60&text=Visa",
    type: "card",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    icon: "/placeholder.svg?height=40&width=60&text=Mastercard",
    type: "card",
  },
  {
    id: "amex",
    name: "American Express",
    icon: "/placeholder.svg?height=40&width=60&text=Amex",
    type: "card",
  },
  {
    id: "discover",
    name: "Discover",
    icon: "/placeholder.svg?height=40&width=60&text=Discover",
    type: "card",
  },

  // Buy Now Pay Later
  {
    id: "klarna",
    name: "Klarna",
    icon: "/placeholder.svg?height=40&width=60&text=Klarna",
    type: "bnpl",
  },
  {
    id: "affirm",
    name: "Affirm",
    icon: "/placeholder.svg?height=40&width=60&text=Affirm",
    type: "bnpl",
  },
  {
    id: "afterpay",
    name: "Afterpay",
    icon: "/placeholder.svg?height=40&width=60&text=Afterpay",
    type: "bnpl",
  },

  // Digital Wallets
  {
    id: "applepay",
    name: "Apple Pay",
    icon: "/placeholder.svg?height=40&width=60&text=ApplePay",
    type: "wallet",
  },
  {
    id: "googlepay",
    name: "Google Pay",
    icon: "/placeholder.svg?height=40&width=60&text=GooglePay",
    type: "wallet",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "/placeholder.svg?height=40&width=60&text=PayPal",
    type: "wallet",
  },
]

export function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showCardForm, setShowCardForm] = useState(false)

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod(methodId)
    setShowCardForm(methodId === "visa" || methodId === "mastercard" || methodId === "amex" || methodId === "discover")
  }

  return (
    <div className="space-y-6">
      {/* Credit/Debit Cards */}
      <div>
        <h3 className="text-sm font-medium mb-3">Credit/Debit Cards</h3>
        <div className="flex flex-wrap gap-3">
          {paymentMethods
            .filter((m) => m.type === "card")
            .map((method) => (
              <button
                key={method.id}
                onClick={() => handleSelectMethod(method.id)}
                className={cn(
                  "relative bg-background p-2 rounded-md border hover:border-primary transition-colors",
                  selectedMethod === method.id ? "border-primary ring-1 ring-primary" : "border-input",
                )}
              >
                <div className="relative h-10 w-16">
                  <Image src={method.icon || "/placeholder.svg"} alt={method.name} fill className="object-contain" />
                </div>
                {selectedMethod === method.id && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
        </div>
      </div>

      {/* Buy Now Pay Later */}
      <div>
        <h3 className="text-sm font-medium mb-3">Buy Now Pay Later</h3>
        <div className="flex flex-wrap gap-3">
          {paymentMethods
            .filter((m) => m.type === "bnpl")
            .map((method) => (
              <button
                key={method.id}
                onClick={() => handleSelectMethod(method.id)}
                className={cn(
                  "relative bg-background p-2 rounded-md border hover:border-primary transition-colors",
                  selectedMethod === method.id ? "border-primary ring-1 ring-primary" : "border-input",
                )}
              >
                <div className="relative h-10 w-16">
                  <Image src={method.icon || "/placeholder.svg"} alt={method.name} fill className="object-contain" />
                </div>
                {selectedMethod === method.id && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
        </div>
      </div>

      {/* Digital Wallets */}
      <div>
        <h3 className="text-sm font-medium mb-3">Digital Wallets</h3>
        <div className="flex flex-wrap gap-3">
          {paymentMethods
            .filter((m) => m.type === "wallet")
            .map((method) => (
              <button
                key={method.id}
                onClick={() => handleSelectMethod(method.id)}
                className={cn(
                  "relative bg-background p-2 rounded-md border hover:border-primary transition-colors",
                  selectedMethod === method.id ? "border-primary ring-1 ring-primary" : "border-input",
                )}
              >
                <div className="relative h-10 w-16">
                  <Image src={method.icon || "/placeholder.svg"} alt={method.name} fill className="object-contain" />
                </div>
                {selectedMethod === method.id && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
        </div>
      </div>

      {/* Card Form */}
      {showCardForm && (
        <div className="mt-6 border rounded-md p-4">
          <h3 className="text-sm font-medium mb-3">Card Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input type="text" id="expiry" placeholder="MM/YY" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                  CVC
                </label>
                <input type="text" id="cvc" placeholder="123" className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="nameOnCard"
                placeholder="John Doe"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
