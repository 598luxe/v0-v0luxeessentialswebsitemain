"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const mainNavItems = [
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
    href: "#",
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
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {mainNavItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.title}
          </Link>

          {item.children && (
            <div className="absolute left-0 top-full z-10 mt-2 hidden w-48 rounded-md border bg-background p-2 group-hover:block">
              {item.children.map((child) => (
                <Link key={child.href} href={child.href} className="block rounded-sm px-3 py-2 text-sm hover:bg-accent">
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
