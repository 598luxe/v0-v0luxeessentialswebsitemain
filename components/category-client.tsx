"use client"

import { useState } from "react"
import { FilterProvider } from "@/context/filter-context"
import { FilterSidebar } from "@/components/filter-sidebar"
import { SortDropdown } from "@/components/sort-dropdown"
import { SearchBar } from "@/components/search-bar"
import { ProductGrid } from "@/components/product-grid"
import type { Product } from "@/app/data/products"

interface CategoryClientProps {
  initialProducts: Product[]
}

export function CategoryClient({ initialProducts }: CategoryClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)

  return (
    <FilterProvider initialProducts={initialProducts}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <FilterSidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar with Search and Sort */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <SearchBar />
              <div className="flex items-center gap-4">
                <div className="text-sm text-black">
                  <span>{filteredProducts.length} products</span>
                </div>
                <SortDropdown />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </FilterProvider>
  )
}
