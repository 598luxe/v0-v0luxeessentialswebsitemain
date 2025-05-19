import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SlidingHeroBanner } from "@/components/sliding-hero-banner"
import { StickyFooter } from "@/components/sticky-footer"
import { LogoHeader } from "@/components/logo-header"
import { SideNavigation } from "@/components/side-navigation"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { FilterProvider } from "@/context/filter-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luxe Essentials",
  description: "Elevate Your Style with Luxe Essentials",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-black`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider>
            <WishlistProvider>
              <FilterProvider>
                <div className="flex min-h-screen bg-[#faf7f5] relative">
                  {/* Side Navigation (always present but hidden on mobile) */}
                  <SideNavigation />

                  {/* Main Content */}
                  <div className="flex-1 w-full overflow-x-hidden flex flex-col min-h-screen md:ml-64">
                    {/* Sliding Announcement Banner */}
                    <SlidingHeroBanner />

                    {/* Logo Header */}
                    <LogoHeader />

                    {/* Page Content */}
                    <div className="flex-grow">{children}</div>

                    {/* Sticky Footer */}
                    <StickyFooter />
                  </div>
                </div>
              </FilterProvider>
            </WishlistProvider>
          </CartProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
