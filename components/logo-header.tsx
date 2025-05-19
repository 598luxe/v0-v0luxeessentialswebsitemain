"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { CartIcon } from "./cart-icon"
import { useState } from "react"

export function LogoHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-black"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/" className="flex items-center">
              <div className="relative w-[320px] h-[50px]">
                <Image
                  src="/images/logo.png"
                  alt="Luxe Essentials"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left" }}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  )
}
