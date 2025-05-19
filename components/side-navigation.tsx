"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { usePathname } from "next/navigation"

const navigationItems = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    href: "/shop",
    subItems: [
      { name: "All Products", href: "/shop" },
      { name: "Handmade Bags", href: "/shop/bags" },
      { name: "Clothing", href: "/shop/clothing" },
      {
        name: "Tech & Accessories",
        href: "/shop/tech",
        subItems: [
          { name: "Phone Accessories", href: "/shop/tech?subcategory=phone" },
          { name: "Audio", href: "/shop/tech?subcategory=audio" },
          { name: "Wellness Devices", href: "/shop/tech?subcategory=wellness" },
        ],
      },
      { name: "Beauty/Makeup", href: "/shop/beauty" },
      { name: "Jewelry & Accessories", href: "/shop/jewelry" },
      { name: "Footwear", href: "/shop/footwear" },
    ],
  },
  { name: "Login/Register", href: "/login" },
  { name: "Orders & Returns", href: "/orders" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
]

export function SideNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const renderNavItems = (items: typeof navigationItems, level = 0) => {
    return items.map((item) => (
      <div key={item.name} className="mb-2">
        <div className="flex items-center">
          {item.subItems ? (
            <button
              onClick={() => toggleExpand(item.name)}
              className={`flex items-center justify-between w-full py-3 px-4 text-black hover:bg-[#e9d8fd]/50 rounded-sm transition-colors font-bold ${level > 0 ? "text-lg pl-8" : "text-xl"}`}
            >
              <span>{item.name}</span>
              {expandedItems.includes(item.name) ? (
                <ChevronDown className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </button>
          ) : (
            <Link
              href={item.href}
              className={`block w-full py-3 px-4 text-black hover:bg-[#e9d8fd]/50 rounded-sm transition-colors font-bold ${
                pathname === item.href ? "bg-[#e9d8fd]/30" : ""
              } ${level > 0 ? "text-lg pl-8" : "text-xl"}`}
              onClick={() => setIsOpen(false)} // Close mobile menu when clicking a link
            >
              {item.name}
            </Link>
          )}
        </div>

        {item.subItems && expandedItems.includes(item.name) && (
          <div className="ml-2 border-l border-[#e9d8fd] pl-2 mt-1">{renderNavItems(item.subItems, level + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <>
      {/* Sidebar Navigation - Desktop */}
      <div className="hidden md:block w-64 bg-[#faf7f5] border-r border-[#e9d8fd] h-screen overflow-y-auto fixed left-0 top-0">
        <div className="p-6">
          <nav className="mt-8">{renderNavItems(navigationItems)}</nav>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} aria-hidden="true">
          <div
            className="absolute top-0 left-0 w-64 h-full bg-[#faf7f5] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b border-[#e9d8fd]">
              <h2 className="font-bold text-xl text-black">Menu</h2>
              <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-black" />
              </button>
            </div>
            <div className="p-6">
              <nav className="mt-8">{renderNavItems(navigationItems)}</nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
