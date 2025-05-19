import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SlidingAnnouncementBanner, StickyFooter } from "@/components/sliding-announcement-banner"
import { LogoHeader } from "@/components/logo-header"
import { SideNavigation } from "@/components/side-navigation"
import { CartIcon } from "@/components/cart-icon"
import { CartProvider } from "@/context/cart-context"
import { FilterProvider } from "@/context/filter-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luxe Essentials",
  description: "Elevate Your Style with Luxe Essentials",
  generator: "v0.dev",
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
            <FilterProvider>
              <div className="flex min-h-screen bg-[#faf7f5] relative">
                {/* Side Navigation (always present) */}
                <SideNavigation />

                {/* Main Content */}
                <div className="flex-1 w-full overflow-x-hidden flex flex-col min-h-screen">
                  {/* Sliding Announcement Banner */}
                  <SlidingAnnouncementBanner />

                  {/* Logo Header */}
                  <div className="sticky top-0 z-40 bg-[#faf7f5] py-3 px-4 shadow-sm">
                    <div className="flex items-center justify-center relative">
                      <LogoHeader />
                      {/* Cart Icon - Fixed Top Right */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <CartIcon />
                      </div>
                    </div>
                  </div>

                  {/* Page Content */}
                  <div className="flex-grow">{children}</div>

                  {/* Sticky Footer */}
                  <StickyFooter />
                </div>
              </div>
            </FilterProvider>
          </CartProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
