import { Suspense } from "react"
import { products } from "@/app/data/products"
import { ProductGrid } from "@/components/product-grid"
import { Skeleton } from "@/components/ui/skeleton"

export default function ShopPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Shop All Products</h1>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid products={products} columns={3} />
      </Suspense>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-md border bg-background overflow-hidden">
          <Skeleton className="aspect-square" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
