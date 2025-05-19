"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Search, User } from "lucide-react"
import { CartIcon } from "./cart-icon"
import { WishlistIcon } from "./wishlist-icon"
import { useState } from "react"
import { SearchBar } from "./search-bar"

export function LogoHeader() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" aria-label="Open menu">
            <Menu className="h-6 w-6 text-black" />
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Luxe Essentials"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2"
              aria-label={showSearch ? "Close search" : "Open search"}
            >
              <Search className="h-6 w-6 text-black" />
            </button>
            <WishlistIcon />
            <CartIcon />
            <Link href="/login" className="p-2">
              <User className="h-6 w-6 text-black" />
            </Link>
          </div>
        </div>

        {/* Search Bar (conditionally rendered) */}
        {showSearch && (
          <div className="mt-3">
            <SearchBar onSearch={() => setShowSearch(false)} />
          </div>
        )}
      </div>
    </header>
  )
}
