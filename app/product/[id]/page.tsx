import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getProductById, getAllCategories, getProductsByCategory } from "@/app/data/products"
import { ProductCarousel } from "@/components/product-carousel"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, ChevronRight } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found | Luxe Essentials",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} | Luxe Essentials`,
    description: product.description,
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  const productIds: { id: string }[] = []

  categories.forEach((category) => {
    const products = getProductsByCategory(category)
    products.forEach((product) => {
      productIds.push({ id: product.id })
    })
  })

  return productIds
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Prepare images for carousel
  const images = [product.image]
  if (product.additionalImages) {
    images.push(...product.additionalImages)
  }

  // Format category for display
  const formattedCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1)

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6 text-black">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`/shop/${product.category}`} className="hover:underline">
          {formattedCategory}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="bg-[#f8f5f2] rounded-lg overflow-hidden">
          <Suspense fallback={<div className="aspect-square bg-gray-200 animate-pulse"></div>}>
            <ProductCarousel images={images} productName={product.name} />
          </Suspense>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-black">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-black">{product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-lg">{product.originalPrice}</span>
              )}
              {product.sale && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>}
            </div>
            <p className="text-black">{product.description}</p>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-black">Color:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                      style={{ backgroundColor: color }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-black">Size:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="min-w-[40px] h-10 px-3 border border-gray-300 rounded-md hover:border-black focus:outline-none focus:ring-2 focus:ring-black text-black"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div>
              {product.stock !== undefined && (
                <p className={`text-sm ${product.stock <= 3 ? "text-red-500" : "text-green-600"}`}>
                  {product.stock === 0
                    ? "Out of Stock"
                    : product.stock <= 3
                      ? `Only ${product.stock} left in stock!`
                      : "In Stock"}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} className="flex-1" />
            <Button variant="outline" className="text-black border-black hover:bg-black hover:text-white">
              <Heart className="h-5 w-5 mr-2" />
              Wishlist
            </Button>
            <Button variant="outline" size="icon" className="text-black border-black hover:bg-black hover:text-white">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <Separator className="my-6" />
              <h3 className="font-bold mb-4 text-black">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-sm text-gray-500">{key}</dt>
                    <dd className="text-black">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
