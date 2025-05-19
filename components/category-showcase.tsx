"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getProductsByCategory } from "@/app/data/products"

interface CategoryShowcaseProps {
  title: string
  category: string
  linkPath: string
}

export function CategoryShowcase({ title, category, linkPath }: CategoryShowcaseProps) {
  const products = getProductsByCategory(category)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const totalProducts = products.length

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProducts)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProducts) % totalProducts)
  }

  // Handle autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, totalProducts])

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="mb-12" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-black">{title}</h2>
        <Link href={linkPath} className="text-sm text-black hover:underline">
          View All
        </Link>
      </div>

      <div className="relative">
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] bg-[#f8f5f2] rounded-lg overflow-hidden">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative h-full w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain"
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 70vw"
                  />
                </div>
              </Link>
            </div>
          ))}

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Previous product"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Next product"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
          </button>
        </div>

        {/* Product info below image */}
        <div className="mt-3 text-center">
          <h3 className="font-medium text-base sm:text-lg text-black">{products[currentIndex].name}</h3>
          <p className="text-sm text-black">{products[currentIndex].price}</p>
        </div>

        {/* Dots Indicator */}
        {totalProducts > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-black" : "bg-gray-300"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
