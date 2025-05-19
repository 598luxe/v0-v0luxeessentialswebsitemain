"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product, ProductColor, ProductSize } from "@/app/data/products"

type SortOption = "featured" | "newest" | "price-low-high" | "price-high-low" | "name-a-z" | "name-z-a"

type FilterState = {
  colors: ProductColor[]
  sizes: ProductSize[]
  priceRange: [number, number]
  searchQuery: string
  sortBy: SortOption
}

type FilterContextType = {
  filters: FilterState
  filteredProducts: Product[]
  setColorFilter: (colors: ProductColor[]) => void
  setSizeFilter: (sizes: ProductSize[]) => void
  setPriceRangeFilter: (range: [number, number]) => void
  setSearchQuery: (query: string) => void
  setSortBy: (option: SortOption) => void
  resetFilters: () => void
}

// Define default price range without relying on getPriceRange
const defaultPriceRange: [number, number] = [0, 1000]

// Create a default context value
const defaultContextValue: FilterContextType = {
  filters: {
    colors: [],
    sizes: [],
    priceRange: defaultPriceRange,
    searchQuery: "",
    sortBy: "featured",
  },
  filteredProducts: [],
  setColorFilter: () => {},
  setSizeFilter: () => {},
  setPriceRangeFilter: () => {},
  setSearchQuery: () => {},
  setSortBy: () => {},
  resetFilters: () => {},
}

const FilterContext = createContext<FilterContextType>(defaultContextValue)

interface FilterProviderProps {
  children: ReactNode
  initialProducts?: Product[] // Make initialProducts optional
}

export function FilterProvider({ children, initialProducts = [] }: FilterProviderProps) {
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    sizes: [],
    priceRange: defaultPriceRange,
    searchQuery: "",
    sortBy: "featured",
  })

  // Apply filters to products (with safety checks)
  const filteredProducts = initialProducts
    .filter((product) => {
      // Filter by color
      if (filters.colors.length > 0 && product.colors) {
        if (!product.colors.some((color) => filters.colors.includes(color))) {
          return false
        }
      }

      // Filter by size
      if (filters.sizes.length > 0 && product.sizes) {
        if (!product.sizes.some((size) => filters.sizes.includes(size))) {
          return false
        }
      }

      // Filter by price range
      const productPrice =
        typeof product.price === "string" ? Number.parseFloat(product.price.replace(/[^0-9.]/g, "")) : product.price

      if (isNaN(productPrice) || productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) {
        return false
      }

      // Filter by search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(query)))
        )
      }

      return true
    })
    .sort((a, b) => {
      // Sort products
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.dateAdded || "").getTime() - new Date(a.dateAdded || "").getTime()
        case "price-low-high":
          const priceA = typeof a.price === "string" ? Number.parseFloat(a.price.replace(/[^0-9.]/g, "")) : a.price
          const priceB = typeof b.price === "string" ? Number.parseFloat(b.price.replace(/[^0-9.]/g, "")) : b.price
          return (isNaN(priceA) ? 0 : priceA) - (isNaN(priceB) ? 0 : priceB)
        case "price-high-low":
          const priceC = typeof a.price === "string" ? Number.parseFloat(a.price.replace(/[^0-9.]/g, "")) : a.price
          const priceD = typeof b.price === "string" ? Number.parseFloat(b.price.replace(/[^0-9.]/g, "")) : b.price
          return (isNaN(priceD) ? 0 : priceD) - (isNaN(priceC) ? 0 : priceC)
        case "name-a-z":
          return a.name.localeCompare(b.name)
        case "name-z-a":
          return b.name.localeCompare(a.name)
        case "featured":
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

  const setColorFilter = (colors: ProductColor[]) => {
    setFilters((prev) => ({ ...prev, colors }))
  }

  const setSizeFilter = (sizes: ProductSize[]) => {
    setFilters((prev) => ({ ...prev, sizes }))
  }

  const setPriceRangeFilter = (priceRange: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange }))
  }

  const setSearchQuery = (searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }))
  }

  const setSortBy = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }))
  }

  const resetFilters = () => {
    setFilters({
      colors: [],
      sizes: [],
      priceRange: defaultPriceRange,
      searchQuery: "",
      sortBy: "featured",
    })
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        filteredProducts,
        setColorFilter,
        setSizeFilter,
        setPriceRangeFilter,
        setSearchQuery,
        setSortBy,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  return useContext(FilterContext)
}
