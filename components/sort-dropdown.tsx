"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useFilter } from "@/context/filter-context"

export function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { filters, setSortBy } = useFilter()

  const options = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name-a-z", label: "Name: A to Z" },
    { value: "name-z-a", label: "Name: Z to A" },
  ]

  const currentOption = options.find((option) => option.value === filters.sortBy) || options[0]

  const handleSelect = (value: string) => {
    setSortBy(value as any)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-[#e9d8fd] rounded-md bg-white text-black"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>Sort: {currentOption.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-[#e9d8fd] rounded-md shadow-lg z-10">
          <ul role="listbox" className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === filters.sortBy}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-[#e9d8fd]/20 text-black ${
                  option.value === filters.sortBy ? "bg-[#e9d8fd]/30 font-medium" : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
