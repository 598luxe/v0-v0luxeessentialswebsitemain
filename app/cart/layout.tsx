import type React from "react"
import { CartPageClient } from "@/components/cart-page-client"

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartPageClient />
    </>
  )
}
