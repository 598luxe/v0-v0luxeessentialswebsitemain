import { Suspense } from "react"
import { notFound } from "next/navigation"
import { products } from "../../data/products"
import { CategoryClient } from "@/components/category-client"

export const dynamic = "force-dynamic"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params

  // Filter products by category
  const categoryProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase())

  if (categoryProducts.length === 0) {
    notFound()
  }

  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 pb-16">
      <h1 className="text-2xl font-light text-black text-center mb-6">{formatCategoryName(category)} Collection</h1>

      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <CategoryClient initialProducts={categoryProducts} />
      </Suspense>
    </main>
  )
}
