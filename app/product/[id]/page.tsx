import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductById, getAllCategories, getProductsByCategory, getRelatedProducts } from "@/app/data/products"
import { ProductCarousel } from "@/components/product-carousel"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistToggleButton } from "@/components/wishlist-toggle-button"

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
  const { id } = params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product)

  // Format price
  const formatPrice = (price: number | string) => {
    // Convert string to number if it's a string
    const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price

    // Check if the price is a valid number
    if (isNaN(numericPrice)) {
      return "$0.00"
    }

    // Format the price with 2 decimal places
    return `$${numericPrice.toFixed(2)}`
  }

  // Prepare images for carousel
  const images = [product.image]
  if (product.additionalImages) {
    images.push(...product.additionalImages)
  }

  // Format category for display
  const formattedCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="bg-white p-4 rounded-lg">
          <div className="aspect-square overflow-hidden rounded-md">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Additional Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-black">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Color Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="min-w-[40px] h-10 flex items-center justify-center px-3 border border-gray-300 rounded-md text-sm cursor-pointer hover:border-black"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart & Wishlist */}
          <div className="flex flex-col space-y-3 mt-6">
            <AddToCartButton product={product} />
            <WishlistToggleButton product={product} />
          </div>

          {/* Additional Info */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col space-y-4">
              <div>
                <span className="font-medium">SKU:</span> {product.id}
              </div>
              {product.stock !== undefined && (
                <div>
                  <span className="font-medium">Availability:</span>{" "}
                  {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </div>
              )}
              {product.category && (
                <div>
                  <span className="font-medium">Category:</span> {product.category}
                  {product.subcategory && ` / ${product.subcategory}`}
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div>
                  <span className="font-medium">Tags:</span> {product.tags.join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <ProductCarousel products={relatedProducts} />
        </div>
      )}
    </div>
  )
}
