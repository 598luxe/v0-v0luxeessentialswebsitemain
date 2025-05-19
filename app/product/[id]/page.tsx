import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getProductById } from "@/app/data/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { ProductImageGallery } from "@/components/product-image-gallery"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Prepare images for gallery
  const images = [product.image]
  if (product.additionalImages) {
    images.push(...product.additionalImages)
  }

  // Format category for display
  const formattedCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1)

  return (
    <div className="container py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href="/shop" className="text-muted-foreground hover:text-foreground">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href={`/shop/${product.category}`} className="text-muted-foreground hover:text-foreground">
          {formattedCategory}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="bg-muted rounded-lg overflow-hidden">
          <ProductImageGallery images={images} productName={product.name} />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold">{product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-lg">{product.originalPrice}</span>
              )}
              {product.sale && <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>}
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div>
            {product.stock !== undefined && (
              <p className={`text-sm ${product.stock <= 3 ? "text-red-600" : "text-green-600"}`}>
                {product.stock === 0
                  ? "Out of Stock"
                  : product.stock <= 3
                    ? `Only ${product.stock} left in stock!`
                    : "In Stock"}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} className="flex-1" />
            <WishlistButton product={product} />
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <Separator className="my-6" />
              <h3 className="font-bold mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-sm text-muted-foreground">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
