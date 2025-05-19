"use client"

export interface Product {
  id: string
  name: string
  description?: string
  price: string | number
  originalPrice?: string | number
  image?: string
  images?: string[]
  category: string
  subcategory?: string
  tags?: string[]
  colors?: string[]
  sizes?: string[]
  stock?: number
  rating?: number
  reviews?: number
  sale?: boolean
  new?: boolean
  featured?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Tote Bag",
    description:
      "A spacious and elegant tote bag perfect for everyday use. Made with high-quality vegan leather and featuring multiple interior pockets.",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=500&width=500&text=Elegant+Tote",
    images: [
      "/placeholder.svg?height=500&width=500&text=Elegant+Tote+1",
      "/placeholder.svg?height=500&width=500&text=Elegant+Tote+2",
      "/placeholder.svg?height=500&width=500&text=Elegant+Tote+3",
    ],
    category: "bags",
    subcategory: "totes",
    tags: ["tote", "vegan leather", "spacious"],
    colors: ["#000000", "#964B00", "#C19A6B"],
    stock: 15,
    rating: 4.8,
    reviews: 124,
    sale: true,
    featured: true,
  },
  {
    id: "2",
    name: "Mini Crossbody Bag",
    description:
      "A compact and stylish crossbody bag perfect for carrying your essentials. Features an adjustable strap and secure zipper closure.",
    price: 49.99,
    image: "/placeholder.svg?height=500&width=500&text=Mini+Crossbody",
    images: [
      "/placeholder.svg?height=500&width=500&text=Mini+Crossbody+1",
      "/placeholder.svg?height=500&width=500&text=Mini+Crossbody+2",
      "/placeholder.svg?height=500&width=500&text=Mini+Crossbody+3",
    ],
    category: "bags",
    subcategory: "crossbody",
    tags: ["crossbody", "compact", "everyday"],
    colors: ["#000000", "#FF0000", "#FFFFFF"],
    stock: 8,
    rating: 4.5,
    reviews: 86,
    new: true,
  },
  {
    id: "3",
    name: "Leather Clutch",
    description: "An elegant leather clutch with a detachable chain strap. Perfect for evening events or a night out.",
    price: 59.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?height=500&width=500&text=Leather+Clutch",
    images: [
      "/placeholder.svg?height=500&width=500&text=Leather+Clutch+1",
      "/placeholder.svg?height=500&width=500&text=Leather+Clutch+2",
      "/placeholder.svg?height=500&width=500&text=Leather+Clutch+3",
    ],
    category: "bags",
    subcategory: "clutches",
    tags: ["clutch", "evening", "leather"],
    colors: ["#000000", "#FFD700", "#C0C0C0"],
    stock: 12,
    rating: 4.7,
    reviews: 53,
    sale: true,
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    description:
      "High-quality wireless earbuds with noise cancellation and long battery life. Perfect for workouts or daily commutes.",
    price: 129.99,
    image: "/placeholder.svg?height=500&width=500&text=Wireless+Earbuds",
    images: [
      "/placeholder.svg?height=500&width=500&text=Wireless+Earbuds+1",
      "/placeholder.svg?height=500&width=500&text=Wireless+Earbuds+2",
      "/placeholder.svg?height=500&width=500&text=Wireless+Earbuds+3",
    ],
    category: "tech",
    subcategory: "audio",
    tags: ["earbuds", "wireless", "noise cancellation"],
    colors: ["#000000", "#FFFFFF"],
    stock: 20,
    rating: 4.6,
    reviews: 215,
    new: true,
    featured: true,
  },
  {
    id: "5",
    name: "Phone Case",
    description: "A durable and stylish phone case that provides excellent protection against drops and scratches.",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=500&width=500&text=Phone+Case",
    images: [
      "/placeholder.svg?height=500&width=500&text=Phone+Case+1",
      "/placeholder.svg?height=500&width=500&text=Phone+Case+2",
      "/placeholder.svg?height=500&width=500&text=Phone+Case+3",
    ],
    category: "tech",
    subcategory: "phone",
    tags: ["phone case", "protection", "durable"],
    colors: ["#000000", "#FF69B4", "#4169E1"],
    stock: 35,
    rating: 4.4,
    reviews: 178,
    sale: true,
  },
  {
    id: "6",
    name: "Sports Digital Watch - Blue/Black",
    description:
      "A multifunctional sports watch with heart rate monitoring, step counting, and water resistance up to 50m.",
    price: 89.99,
    image: "/placeholder.svg?height=500&width=500&text=Sports+Watch",
    images: [
      "/placeholder.svg?height=500&width=500&text=Sports+Watch+1",
      "/placeholder.svg?height=500&width=500&text=Sports+Watch+2",
      "/placeholder.svg?height=500&width=500&text=Sports+Watch+3",
    ],
    category: "tech",
    subcategory: "wearables",
    tags: ["watch", "sports", "fitness"],
    colors: ["#000000", "#0000FF", "#FF0000"],
    stock: 18,
    rating: 4.7,
    reviews: 92,
    new: true,
  },
  {
    id: "7",
    name: "Facial Cleanser",
    description:
      "A gentle yet effective facial cleanser that removes impurities without stripping the skin of its natural oils.",
    price: 18.99,
    image: "/placeholder.svg?height=500&width=500&text=Facial+Cleanser",
    images: [
      "/placeholder.svg?height=500&width=500&text=Facial+Cleanser+1",
      "/placeholder.svg?height=500&width=500&text=Facial+Cleanser+2",
      "/placeholder.svg?height=500&width=500&text=Facial+Cleanser+3",
    ],
    category: "beauty",
    subcategory: "skincare",
    tags: ["cleanser", "skincare", "gentle"],
    stock: 25,
    rating: 4.5,
    reviews: 143,
    featured: true,
  },
  {
    id: "8",
    name: "Matte Lipstick",
    description: "A long-lasting matte lipstick that provides rich color and comfortable wear throughout the day.",
    price: 14.99,
    originalPrice: 19.99,
    image: "/placeholder.svg?height=500&width=500&text=Matte+Lipstick",
    images: [
      "/placeholder.svg?height=500&width=500&text=Matte+Lipstick+1",
      "/placeholder.svg?height=500&width=500&text=Matte+Lipstick+2",
      "/placeholder.svg?height=500&width=500&text=Matte+Lipstick+3",
    ],
    category: "beauty",
    subcategory: "makeup",
    tags: ["lipstick", "matte", "long-lasting"],
    colors: ["#8B0000", "#FF69B4", "#FF4500"],
    stock: 30,
    rating: 4.6,
    reviews: 118,
    sale: true,
  },
  {
    id: "9",
    name: "Hydrating Face Mask",
    description: "A deeply hydrating face mask that replenishes moisture and leaves skin feeling soft and rejuvenated.",
    price: 22.99,
    image: "/placeholder.svg?height=500&width=500&text=Face+Mask",
    images: [
      "/placeholder.svg?height=500&width=500&text=Face+Mask+1",
      "/placeholder.svg?height=500&width=500&text=Face+Mask+2",
      "/placeholder.svg?height=500&width=500&text=Face+Mask+3",
    ],
    category: "beauty",
    subcategory: "skincare",
    tags: ["face mask", "hydrating", "skincare"],
    stock: 22,
    rating: 4.8,
    reviews: 76,
    new: true,
  },
  {
    id: "10",
    name: "Casual T-Shirt",
    description: "A comfortable and versatile cotton t-shirt perfect for everyday wear.",
    price: 19.99,
    image: "/placeholder.svg?height=500&width=500&text=Casual+T-Shirt",
    images: [
      "/placeholder.svg?height=500&width=500&text=T-Shirt+1",
      "/placeholder.svg?height=500&width=500&text=T-Shirt+2",
      "/placeholder.svg?height=500&width=500&text=T-Shirt+3",
    ],
    category: "clothing",
    subcategory: "tops",
    tags: ["t-shirt", "casual", "cotton"],
    colors: ["#000000", "#FFFFFF", "#808080", "#0000FF"],
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
    rating: 4.3,
    reviews: 210,
  },
  {
    id: "11",
    name: "Slim Fit Jeans",
    description: "Classic slim fit jeans made from high-quality denim with a touch of stretch for comfort.",
    price: 49.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=500&width=500&text=Slim+Fit+Jeans",
    images: [
      "/placeholder.svg?height=500&width=500&text=Jeans+1",
      "/placeholder.svg?height=500&width=500&text=Jeans+2",
      "/placeholder.svg?height=500&width=500&text=Jeans+3",
    ],
    category: "clothing",
    subcategory: "bottoms",
    tags: ["jeans", "slim fit", "denim"],
    colors: ["#000080", "#4169E1"],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 35,
    rating: 4.5,
    reviews: 175,
    sale: true,
  },
  {
    id: "12",
    name: "Knit Sweater",
    description: "A cozy knit sweater perfect for layering during colder months.",
    price: 39.99,
    image: "/placeholder.svg?height=500&width=500&text=Knit+Sweater",
    images: [
      "/placeholder.svg?height=500&width=500&text=Sweater+1",
      "/placeholder.svg?height=500&width=500&text=Sweater+2",
      "/placeholder.svg?height=500&width=500&text=Sweater+3",
    ],
    category: "clothing",
    subcategory: "outerwear",
    tags: ["sweater", "knit", "cozy"],
    colors: ["#A52A2A", "#F5F5DC", "#808080"],
    sizes: ["S", "M", "L", "XL"],
    stock: 28,
    rating: 4.7,
    reviews: 92,
    new: true,
  },
  {
    id: "13",
    name: "Gold Hoop Earrings",
    description: "Classic gold hoop earrings that add a touch of elegance to any outfit.",
    price: 29.99,
    image: "/placeholder.svg?height=500&width=500&text=Gold+Hoops",
    images: [
      "/placeholder.svg?height=500&width=500&text=Earrings+1",
      "/placeholder.svg?height=500&width=500&text=Earrings+2",
      "/placeholder.svg?height=500&width=500&text=Earrings+3",
    ],
    category: "jewelry",
    subcategory: "earrings",
    tags: ["earrings", "gold", "hoops"],
    stock: 40,
    rating: 4.6,
    reviews: 128,
    featured: true,
  },
  {
    id: "14",
    name: "Layered Necklace",
    description: "A delicate layered necklace featuring multiple chains and pendants.",
    price: 34.99,
    originalPrice: 39.99,
    image: "/placeholder.svg?height=500&width=500&text=Layered+Necklace",
    images: [
      "/placeholder.svg?height=500&width=500&text=Necklace+1",
      "/placeholder.svg?height=500&width=500&text=Necklace+2",
      "/placeholder.svg?height=500&width=500&text=Necklace+3",
    ],
    category: "jewelry",
    subcategory: "necklaces",
    tags: ["necklace", "layered", "pendant"],
    colors: ["#FFD700", "#C0C0C0"],
    stock: 25,
    rating: 4.8,
    reviews: 86,
    sale: true,
  },
  {
    id: "15",
    name: "Beaded Bracelet Set",
    description: "A set of three beaded bracelets that can be worn together or separately.",
    price: 19.99,
    image: "/placeholder.svg?height=500&width=500&text=Beaded+Bracelets",
    images: [
      "/placeholder.svg?height=500&width=500&text=Bracelet+1",
      "/placeholder.svg?height=500&width=500&text=Bracelet+2",
      "/placeholder.svg?height=500&width=500&text=Bracelet+3",
    ],
    category: "jewelry",
    subcategory: "bracelets",
    tags: ["bracelet", "beaded", "set"],
    colors: ["#FFD700", "#C0C0C0", "#B87333"],
    stock: 30,
    rating: 4.4,
    reviews: 65,
    new: true,
  },
  {
    id: "16",
    name: "Leather Ankle Boots",
    description: "Stylish leather ankle boots with a comfortable block heel and side zipper.",
    price: 89.99,
    image: "/placeholder.svg?height=500&width=500&text=Ankle+Boots",
    images: [
      "/placeholder.svg?height=500&width=500&text=Boots+1",
      "/placeholder.svg?height=500&width=500&text=Boots+2",
      "/placeholder.svg?height=500&width=500&text=Boots+3",
    ],
    category: "footwear",
    subcategory: "boots",
    tags: ["boots", "leather", "ankle"],
    colors: ["#000000", "#8B4513"],
    sizes: ["5", "6", "7", "8", "9", "10"],
    stock: 20,
    rating: 4.7,
    reviews: 112,
    featured: true,
  },
  {
    id: "17",
    name: "Canvas Sneakers",
    description: "Classic canvas sneakers that provide comfort and style for everyday wear.",
    price: 44.99,
    originalPrice: 49.99,
    image: "/placeholder.svg?height=500&width=500&text=Canvas+Sneakers",
    images: [
      "/placeholder.svg?height=500&width=500&text=Sneakers+1",
      "/placeholder.svg?height=500&width=500&text=Sneakers+2",
      "/placeholder.svg?height=500&width=500&text=Sneakers+3",
    ],
    category: "footwear",
    subcategory: "sneakers",
    tags: ["sneakers", "canvas", "casual"],
    colors: ["#FFFFFF", "#000000", "#FF0000", "#0000FF"],
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    stock: 45,
    rating: 4.5,
    reviews: 198,
    sale: true,
  },
  {
    id: "18",
    name: "Strappy Sandals",
    description: "Elegant strappy sandals with a low heel, perfect for summer evenings.",
    price: 59.99,
    image: "/placeholder.svg?height=500&width=500&text=Strappy+Sandals",
    images: [
      "/placeholder.svg?height=500&width=500&text=Sandals+1",
      "/placeholder.svg?height=500&width=500&text=Sandals+2",
      "/placeholder.svg?height=500&width=500&text=Sandals+3",
    ],
    category: "footwear",
    subcategory: "sandals",
    tags: ["sandals", "strappy", "summer"],
    colors: ["#FFFFFF", "#000000", "#FFD700"],
    stock: 32,
    rating: 4.6,
    reviews: 154,
  },
]

export function getPriceRange() {
  // Calculate min and max prices from all products
  const prices = products
    .map((product) => {
      // Convert string prices to numbers
      if (typeof product.price === "string") {
        return Number.parseFloat(product.price.replace(/[^0-9.]/g, ""))
      }
      return product.price
    })
    .filter((price) => !isNaN(price))

  return {
    min: Math.min(...prices, 0),
    max: Math.max(...prices, 1000),
  }
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(product: Product, limit = 4) {
  // Get products in the same category, excluding the current product
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id)

  // Shuffle the array to get random products
  const shuffled = [...relatedProducts].sort(() => 0.5 - Math.random())

  // Return the specified number of products
  return shuffled.slice(0, limit)
}
