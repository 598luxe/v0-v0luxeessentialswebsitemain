"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Product, type ProductColor, type ProductSize, getPriceRange } from "@/app/data/products"

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

const defaultPriceRange = getPriceRange()

// Create a default context value
const defaultContextValue: FilterContextType = {
  filters: {
    colors: [],
    sizes: [],
    priceRange: [defaultPriceRange.min, defaultPriceRange.max],
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
    priceRange: [defaultPriceRange.min, defaultPriceRange.max],
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
      if (product.numericPrice < filters.priceRange[0] || product.numericPrice > filters.priceRange[1]) {
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
          return a.numericPrice - b.numericPrice
        case "price-high-low":
          return b.numericPrice - a.numericPrice
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
      priceRange: [defaultPriceRange.min, defaultPriceRange.max],
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
