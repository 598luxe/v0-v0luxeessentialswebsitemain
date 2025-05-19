"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number | string
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

// Create a default context with safe values
const defaultCartContext: CartContextType = {
  items: [],
  itemCount: 0,
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
}

const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setMounted(true)
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    }
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (!mounted) return

    try {
      localStorage.setItem("cart", JSON.stringify(items))

      // Calculate totals
      const count = items.reduce((total, item) => total + item.quantity, 0)

      const price = items.reduce((total, item) => {
        const itemPrice =
          typeof item.price === "number"
            ? item.price
            : Number.parseFloat(item.price.toString().replace(/[^0-9.]/g, "")) || 0
        return total + itemPrice * item.quantity
      }, 0)

      setItemCount(count)
      setTotalPrice(price)
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [items, mounted])

  const addItem = (newItem: CartItem) => {
    try {
      setItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          const updatedItems = [...prevItems]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + (newItem.quantity || 1),
          }
          return updatedItems
        } else {
          // Add new item
          return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }]
        }
      })
    } catch (error) {
      console.error("Error adding item to cart:", error)
    }
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
