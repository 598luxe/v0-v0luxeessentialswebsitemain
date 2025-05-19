"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, User } from "lucide-react"
import { CartIcon } from "./cart-icon"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNavigation } from "./side-navigation"

export function LogoHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`
  }

  return (
    <header className="sticky top-0 z-40 bg-[#faf7f5] border-b border-[#e9d8fd]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2" aria-label="Open menu">
                <Menu className="h-6 w-6 text-black" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px] sm:max-w-none">
              <SideNavigation />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/" className="flex items-center">
              <div className="relative w-[200px] sm:w-[250px] md:w-[320px] h-[40px] sm:h-[50px]">
                <Image
                  src="/images/logo.png"
                  alt="Luxe Essentials"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  priority
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 320px"
                />
              </div>
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              <Search className="h-6 w-6 text-black" />
            </button>
            <CartIcon />
            <Link href="/login" className="p-2">
              <User className="h-6 w-6 text-black" />
            </Link>
          </div>
        </div>

        {/* Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="mt-3 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 pl-10 border border-[#e9d8fd] rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-md text-sm"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
