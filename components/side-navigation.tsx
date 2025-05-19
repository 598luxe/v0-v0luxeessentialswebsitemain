"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { SheetClose } from "@/components/ui/sheet"

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
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

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
            <SheetClose asChild>
              <Link
                href={item.href}
                className={`block w-full py-3 px-4 text-black hover:bg-[#e9d8fd]/50 rounded-sm transition-colors font-bold ${
                  pathname === item.href ? "bg-[#e9d8fd]/30" : ""
                } ${level > 0 ? "text-lg pl-8" : "text-xl"}`}
              >
                {item.name}
              </Link>
            </SheetClose>
          )}
        </div>

        {item.subItems && expandedItems.includes(item.name) && (
          <div className="ml-2 border-l border-[#e9d8fd] pl-2 mt-1">{renderNavItems(item.subItems, level + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <div className="h-full bg-[#faf7f5] overflow-y-auto">
      <div className="p-4 flex justify-between items-center border-b border-[#e9d8fd]">
        <h2 className="font-bold text-xl text-black">Menu</h2>
        <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </div>
      <div className="p-4">
        <nav>{renderNavItems(navigationItems)}</nav>
      </div>
    </div>
  )
}
