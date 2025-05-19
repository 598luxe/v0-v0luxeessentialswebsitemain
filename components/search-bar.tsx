"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useFilter } from "@/context/filter-context"

export function SearchBar() {
  const { filters, setSearchQuery } = useFilter()
  const [inputValue, setInputValue] = useState("")

  // Initialize input value from filters
  useEffect(() => {
    if (filters && filters.searchQuery) {
      setInputValue(filters.searchQuery)
    }
  }, [filters])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(inputValue)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClear = () => {
    setInputValue("")
    setSearchQuery("")
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleChange}
        className="w-full pl-10 pr-10 py-2 border border-[#e9d8fd] rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
      />
      <button type="submit" className="absolute inset-y-0 left-0 flex items-center pl-3" aria-label="Search">
        <Search className="h-5 w-5 text-black/50" />
      </button>
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          aria-label="Clear search"
        >
          <X className="h-5 w-5 text-black/50" />
        </button>
      )}
    </form>
  )
}
