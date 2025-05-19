"use client"

import { Package } from "lucide-react"

export function StickyFooter() {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#e9d8fd] py-2 sm:py-3 text-center text-xs sm:text-sm text-black font-bold z-40">
      <div className="flex items-center justify-center px-2">
        <Package className="h-4 w-4 mr-1 sm:mr-2 flex-shrink-0" />
        <p className="truncate">
          <span className="hidden sm:inline">FREE STANDARD SHIPPING ON U.S. ORDERS $50+ | </span>
          <span>FREE EXPRESS SHIPPING ON U.S. ORDERS $100+</span>
        </p>
      </div>
    </div>
  )
}
