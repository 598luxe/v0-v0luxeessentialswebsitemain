"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const bannerTexts = [
  {
    text: "ENJOY $5 OFF YOUR FIRST ORDER WHEN YOU",
    link: {
      text: "SIGN UP",
      href: "/login",
    },
  },
  "HANDMADE BAGS",
  "CLOTHING",
  "TECH & ACCESSORIES",
  "BEAUTY/MAKEUP",
  "JEWELRY & ACCESSORIES",
  "FOOTWEAR",
]

export function SlidingHeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerTexts.length)
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#e9d8fd] py-2.5 overflow-hidden">
      <div className="relative h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm text-black font-medium px-2 sm:px-0"
          >
            {typeof bannerTexts[currentIndex] === "string" ? (
              bannerTexts[currentIndex]
            ) : (
              <div className="flex items-center space-x-1 flex-wrap justify-center">
                <span>{bannerTexts[currentIndex].text}</span>
                <Link
                  href={bannerTexts[currentIndex].link.href}
                  className="underline font-bold hover:text-[#6b46c1] text-black"
                >
                  {bannerTexts[currentIndex].link.text}
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
