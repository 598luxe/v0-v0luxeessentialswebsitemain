"use client"

import Image from "next/image"

export function PaymentMethods() {
  const paymentMethods = [
    { name: "Visa", icon: "/placeholder.svg?height=30&width=50&text=Visa" },
    { name: "Mastercard", icon: "/placeholder.svg?height=30&width=50&text=Mastercard" },
    { name: "American Express", icon: "/placeholder.svg?height=30&width=50&text=Amex" },
    { name: "PayPal", icon: "/placeholder.svg?height=30&width=50&text=PayPal" },
    { name: "Apple Pay", icon: "/placeholder.svg?height=30&width=50&text=ApplePay" },
  ]

  const handlePaymentClick = (methodName: string) => {
    alert(`You selected ${methodName} as your payment method.`)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {paymentMethods.map((method) => (
        <button
          key={method.name}
          onClick={() => handlePaymentClick(method.name)}
          className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
          title={`Pay with ${method.name}`}
        >
          <Image src={method.icon || "/placeholder.svg"} alt={method.name} width={50} height={30} />
        </button>
      ))}
    </div>
  )
}
