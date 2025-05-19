"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/app/data/products"

interface WishlistContextType {
  items: Product[]
  itemCount: number
  isInWishlist: (id: string) => boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  toggleItem: (product: Product) => void
  clearWishlist: () => void
}

// Create a default context with safe values
const defaultWishlistContext: WishlistContextType = {
  items: [],
  itemCount: 0,
  isInWishlist: () => false,
  addItem: () => {},
  removeItem: () => {},
  toggleItem: () => {},
  clearWishlist: () => {},
}

const WishlistContext = createContext<WishlistContextType>(defaultWishlistContext)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setMounted(true)
    try {
      const savedWishlist = localStorage.getItem("wishlist")
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
    }
  }, [])

  // Update localStorage when wishlist changes
  useEffect(() => {
    if (!mounted) return

    try {
      localStorage.setItem("wishlist", JSON.stringify(items))
      setItemCount(items.length)
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error)
    }
  }, [items, mounted])

  const isInWishlist = (id: string) => {
    return items.some((item) => item.id === id)
  }

  const addItem = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems((prevItems) => [...prevItems, product])
    }
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const toggleItem = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const clearWishlist = () => {
    setItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        isInWishlist,
        addItem,
        removeItem,
        toggleItem,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
