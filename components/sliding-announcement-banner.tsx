"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const announcements = [
  "FREE EXPRESS SHIPPING ON U.S. ORDERS $100+",
  "NEW SUMMER COLLECTION AVAILABLE NOW",
  "SIGN UP FOR OUR NEWSLETTER AND GET 10% OFF",
]

export function SlidingAnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isVisible || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, isPaused])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + announcements.length) % announcements.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="bg-[#e9d8fd] text-black py-2 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 p-1 text-black hover:text-black/70"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="text-center text-sm font-medium overflow-hidden h-6">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className={cn(
                "transition-all duration-500 transform",
                index === currentIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 absolute",
              )}
            >
              {announcement}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-8 sm:right-10 p-1 text-black hover:text-black/70"
          aria-label="Next announcement"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          onClick={handleClose}
          className="absolute right-2 sm:right-4 p-1 text-black hover:text-black/70"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
