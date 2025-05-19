import type React from "react"
import { CheckoutPageClient } from "@/components/checkout-page-client"

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CheckoutPageClient />
    </>
  )
}
