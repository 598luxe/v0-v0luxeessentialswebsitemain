import { Suspense } from "react"
import { notFound } from "next/navigation"
import { CategoryClient } from "@/components/category-client"
import { products } from "@/app/data/products"

interface CategoryPageProps {
  params: {
    category: string
  }
  searchParams: {
    subcategory?: string
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = params
  const { subcategory } = searchParams

  // Validate category
  const validCategories = ["clothing", "tech", "home"]
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Filter products by category and subcategory if provided
  let filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase())

  if (subcategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.subcategory?.toLowerCase() === subcategory.toLowerCase(),
    )
  }

  // Get unique subcategories for this category
  const subcategories = Array.from(
    new Set(
      products
        .filter((product) => product.category.toLowerCase() === category.toLowerCase())
        .map((product) => product.subcategory)
        .filter(Boolean) as string[],
    ),
  )

  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {formatCategoryName(category)} {subcategory ? `- ${formatCategoryName(subcategory)}` : ""}
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <CategoryClient
          products={filteredProducts}
          category={category}
          subcategories={subcategories}
          currentSubcategory={subcategory}
        />
      </Suspense>
    </div>
  )
}
