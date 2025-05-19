"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No image available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="aspect-square relative">
        {imageErrors[currentIndex] ? (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">{productName}</span>
          </div>
        ) : (
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${productName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={currentIndex === 0}
            onError={() => handleImageError(currentIndex)}
          />
        )}
      </div>

      {/* Only show navigation if there are multiple images */}
      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous image</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next image</span>
          </Button>

          {/* Thumbnails */}
          <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-16 h-16 flex-shrink-0 border-2 rounded overflow-hidden ${
                  currentIndex === index ? "border-primary" : "border-transparent"
                }`}
              >
                {imageErrors[index] ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-xs text-muted-foreground">{index + 1}</span>
                  </div>
                ) : (
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${productName} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(index)}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
