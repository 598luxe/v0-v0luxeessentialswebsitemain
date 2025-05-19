"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SheetClose } from "@/components/ui/sheet"
import Image from "next/image"

const mobileNavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
  {
    title: "Categories",
    children: [
      {
        title: "Jewelry",
        href: "/shop/jewelry",
      },
      {
        title: "Tech",
        href: "/shop/tech",
      },
      {
        title: "Bags",
        href: "/shop/bags",
      },
    ],
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
  },
  {
    title: "Sale",
    href: "/sale",
  },
  {
    title: "Account",
    href: "/account",
  },
  {
    title: "Orders",
    href: "/orders",
  },
  {
    title: "Wishlist",
    href: "/wishlist",
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<string[]>([])

  const toggleExpand = (title: string) => {
    setExpanded((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]))
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-12 pt-6">
      <div className="flex items-center justify-center mb-8">
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40">
            <Image src="/images/logo.png" alt="Luxe Essentials" fill style={{ objectFit: "contain" }} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col space-y-3 px-6">
        {mobileNavItems.map((item) => (
          <div key={item.title} className="space-y-3">
            {item.href ? (
              <SheetClose asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors",
                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                  )}
                >
                  {item.title}
                </Link>
              </SheetClose>
            ) : (
              <button
                onClick={() => toggleExpand(item.title)}
                className="flex w-full items-center justify-between text-base font-medium"
              >
                <span>{item.title}</span>
                {expanded.includes(item.title) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}

            {item.children && expanded.includes(item.title) && (
              <div className="ml-4 space-y-2">
                {item.children.map((child) => (
                  <SheetClose key={child.href} asChild>
                    <Link
                      href={child.href}
                      className={cn(
                        "block text-base transition-colors",
                        pathname === child.href ? "text-foreground" : "text-foreground/60",
                      )}
                    >
                      {child.title}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
