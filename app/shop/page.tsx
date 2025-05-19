import { Suspense } from "react"
import type { Metadata } from "next"
import { products } from "@/app/data/products"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import { SortDropdown } from "@/components/sort-dropdown"
import { SearchBar } from "@/components/search-bar"
import { FilterProvider } from "@/context/filter-context"

export const metadata: Metadata = {
  title: "Shop All Products | Luxe Essentials",
  description: "Browse our collection of luxury essentials for your lifestyle.",
}

export default function ShopPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Shop All Products</h1>

      <FilterProvider initialProducts={products}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <FilterSidebar />
          </div>

          <div className="w-full md:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
              <SearchBar />
              <SortDropdown />
            </div>

            <Suspense fallback={<div className="text-center py-10 text-black">Loading products...</div>}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </FilterProvider>
    </main>
  )
}
