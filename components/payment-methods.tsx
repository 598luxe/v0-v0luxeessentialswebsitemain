"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Gift } from "lucide-react"

export function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    // Reset payment status when changing methods
    setPaymentSuccess(false)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)
    }, 1500)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-black">Payment Method</h2>

      <form onSubmit={handlePaymentSubmit}>
        <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-4">
          {/* Credit Card Option */}
          <div
            className={`border rounded-lg p-4 ${paymentMethod === "credit-card" ? "border-black" : "border-gray-200"}`}
          >
            <div className="flex items-start">
              <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
              <Label htmlFor="credit-card" className="flex-1 ml-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-black" />
                  <span className="font-medium text-black">Credit / Debit Card</span>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="card-number" className="text-sm text-black">
                        Card Number
                      </Label>
                      <input
                        id="card-number"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-sm text-black">
                          Expiry Date
                        </Label>
                        <input
                          id="expiry"
                          type="text"
                          placeholder="MM/YY"
                          className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm text-black">
                          CVV
                        </Label>
                        <input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name-on-card" className="text-sm text-black">
                        Name on Card
                      </Label>
                      <input
                        id="name-on-card"
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
                      />
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm text-gray-500">We accept:</span>
                      <div className="flex space-x-2">
                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold">VISA</span>
                        </div>
                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold">MC</span>
                        </div>
                        <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold">AMEX</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Label>
            </div>
          </div>

          {/* PayPal Option */}
          <div className={`border rounded-lg p-4 ${paymentMethod === "paypal" ? "border-black" : "border-gray-200"}`}>
            <div className="flex items-start">
              <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
              <Label htmlFor="paypal" className="flex-1 ml-2">
                <div className="flex items-center">
                  <div className="mr-2 text-[#003087] font-bold text-lg">
                    Pay<span className="text-[#009cde]">Pal</span>
                  </div>
                  <span className="font-medium text-black">PayPal</span>
                </div>

                {paymentMethod === "paypal" && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                    <div className="bg-[#f5f5f5] p-4 rounded-md">
                      <p className="text-sm text-black">
                        PayPal account: <span className="font-medium">Not connected</span>
                      </p>
                    </div>
                  </div>
                )}
              </Label>
            </div>
          </div>

          {/* Apple Pay Option */}
          <div
            className={`border rounded-lg p-4 ${paymentMethod === "apple-pay" ? "border-black" : "border-gray-200"}`}
          >
            <div className="flex items-start">
              <RadioGroupItem value="apple-pay" id="apple-pay" className="mt-1" />
              <Label htmlFor="apple-pay" className="flex-1 ml-2">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17.0001 7.5C16.5501 8.05 15.8001 8.5 15.0001 8.45C14.9001 7.7 15.2501 6.95 15.6501 6.45C16.1001 5.85 16.9001 5.45 17.6001 5.5C17.7001 6.25 17.4501 7 17.0001 7.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17.0001 8.5C16.1001 8.45 15.3001 9 14.8001 9C14.3001 9 13.6001 8.55 12.9001 8.55C11.7001 8.55 10.4001 9.55 10.4001 11.5C10.4001 12.45 10.6501 13.4 11.0001 14.15C11.3001 14.75 11.6501 15.3 12.1501 15.3C12.6001 15.3 12.8001 15 13.4001 15C14.0001 15 14.2001 15.3 14.7001 15.3C15.2001 15.3 15.5001 14.8 15.8001 14.2C16.1501 13.5 16.3001 12.8 16.3001 12.75C16.3001 12.7 15.6001 12.45 15.6001 11.5C15.6001 10.65 16.1501 10.25 16.2001 10.2C15.8001 9.65 15.1501 9.5 15.0001 9.5"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-medium text-black">Apple Pay</span>
                </div>

                {paymentMethod === "apple-pay" && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-4">Pay securely using Apple Pay.</p>
                    <div className="bg-[#f5f5f5] p-4 rounded-md flex items-center justify-center">
                      <button className="bg-black text-white py-2 px-4 rounded-md flex items-center">
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M17.0001 7.5C16.5501 8.05 15.8001 8.5 15.0001 8.45C14.9001 7.7 15.2501 6.95 15.6501 6.45C16.1001 5.85 16.9001 5.45 17.6001 5.5C17.7001 6.25 17.4501 7 17.0001 7.5Z"
                            fill="white"
                          />
                          <path
                            d="M17.0001 8.5C16.1001 8.45 15.3001 9 14.8001 9C14.3001 9 13.6001 8.55 12.9001 8.55C11.7001 8.55 10.4001 9.55 10.4001 11.5C10.4001 12.45 10.6501 13.4 11.0001 14.15C11.3001 14.75 11.6501 15.3 12.1501 15.3C12.6001 15.3 12.8001 15 13.4001 15C14.0001 15 14.2001 15.3 14.7001 15.3C15.2001 15.3 15.5001 14.8 15.8001 14.2C16.1501 13.5 16.3001 12.8 16.3001 12.75C16.3001 12.7 15.6001 12.45 15.6001 11.5C15.6001 10.65 16.1501 10.25 16.2001 10.2C15.8001 9.65 15.1501 9.5 15.0001 9.5"
                            fill="white"
                          />
                        </svg>
                        Pay
                      </button>
                    </div>
                  </div>
                )}
              </Label>
            </div>
          </div>

          {/* Gift Card Option */}
          <div
            className={`border rounded-lg p-4 ${paymentMethod === "gift-card" ? "border-black" : "border-gray-200"}`}
          >
            <div className="flex items-start">
              <RadioGroupItem value="gift-card" id="gift-card" className="mt-1" />
              <Label htmlFor="gift-card" className="flex-1 ml-2">
                <div className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-black" />
                  <span className="font-medium text-black">Gift Card</span>
                </div>

                {paymentMethod === "gift-card" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="gift-card-number" className="text-sm text-black">
                        Gift Card Number
                      </Label>
                      <input
                        id="gift-card-number"
                        type="text"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gift-card-pin" className="text-sm text-black">
                        PIN
                      </Label>
                      <input
                        id="gift-card-pin"
                        type="text"
                        placeholder="XXXX"
                        className="w-full p-2 border border-gray-300 rounded-md mt-1 text-black"
                      />
                    </div>
                  </div>
                )}
              </Label>
            </div>
          </div>
        </RadioGroup>

        {paymentSuccess ? (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-700 font-medium">Payment method successfully added!</p>
          </div>
        ) : (
          <Button type="submit" className="w-full mt-6 bg-black text-white hover:bg-black/90" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Save Payment Method"}
          </Button>
        )}
      </form>
    </div>
  )
}
