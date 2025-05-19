"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package } from "lucide-react"

const announcements = [
  <span key="0">
    ENJOY $5 OFF YOUR FIRST ORDER WHEN YOU{" "}
    <Link href="/login" className="underline font-semibold">
      SIGN UP
    </Link>
    !
  </span>,
  <span key="1">HANDMADE BAGS</span>,
  <span key="2">CLOTHING</span>,
  <span key="3">TECH & ACCESSORIES</span>,
  <span key="4">BEAUTY/MAKEUP</span>,
  <span key="5">JEWELRY & ACCESSORIES</span>,
  <span key="6">FOOTWEAR</span>,
]

export function SlidingAnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
    }, 5000) // Slowed down to 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black text-white py-3 px-4 text-center text-sm">
      <div className="relative h-5">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center transition-all duration-1000" // Slowed down transition
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <span className="text-sm font-medium">{announcement}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2">
        <Package className="h-4 w-4 mr-2" />
        <p>FREE STANDARD SHIPPING ON U.S. ORDERS $50+ | FREE EXPRESS SHIPPING ON U.S. ORDERS $100+</p>
      </div>
    </div>
  )
}

export function StickyFooter() {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-[#e9d8fd] py-3 text-center text-sm text-black font-bold z-40">
      📦 FREE STANDARD SHIPPING ON U.S. ORDERS $50+ | FREE EXPRESS SHIPPING ON U.S. ORDERS $100+
    </div>
  )
}
