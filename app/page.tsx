import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { getFeaturedProducts } from "@/app/data/products"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src="/placeholder.svg?height=500&width=1200&text=Luxe+Essentials+Hero"
          alt="Luxe Essentials"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Elevate Your Style</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Discover premium products for modern living at Luxe Essentials. Shop our curated collection of luxury items.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link href="/new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link href="/shop" className="text-sm font-medium underline underline-offset-4">
            View All
          </Link>
        </div>
        <ProductGrid products={featuredProducts} columns={3} />
      </section>

      {/* Categories */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/shop/jewelry" className="group relative h-60 overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=240&width=400&text=Jewelry"
                alt="Jewelry"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Jewelry</span>
              </div>
            </Link>
            <Link href="/shop/tech" className="group relative h-60 overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=240&width=400&text=Tech"
                alt="Tech"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Tech</span>
              </div>
            </Link>
            <Link href="/shop/bags" className="group relative h-60 overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=240&width=400&text=Bags"
                alt="Bags"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Bags</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16">
        <div className="bg-primary/10 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stay updated with our latest products, exclusive offers, and style tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
