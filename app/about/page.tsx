import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">About Luxe Essentials</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="relative h-64 md:h-96">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Luxe Essentials Store"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">Our Story</h2>
            <p className="text-black mb-6">
              Luxe Essentials is a premium lifestyle brand dedicated to providing high-quality products that combine
              elegance, functionality, and sustainability. Founded in 2018, we've grown from a small boutique to a
              respected name in luxury retail, offering carefully curated collections across clothing, tech accessories,
              and home goods.
            </p>

            <p className="text-black mb-6">
              Our mission is to deliver exceptional products that enhance everyday living while maintaining our
              commitment to ethical sourcing and production. Each item in our collection is thoughtfully designed and
              crafted to meet the highest standards of quality and style.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-black">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2 text-black">Quality</h3>
                <p className="text-black text-sm">
                  We never compromise on materials or craftsmanship, ensuring every product meets our exacting
                  standards.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2 text-black">Sustainability</h3>
                <p className="text-black text-sm">
                  We're committed to reducing our environmental impact through responsible sourcing and eco-friendly
                  practices.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2 text-black">Innovation</h3>
                <p className="text-black text-sm">
                  We continuously explore new designs, materials, and technologies to enhance our product offerings.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-black">Our Commitment</h2>
            <p className="text-black mb-8">
              At Luxe Essentials, we believe that luxury should be accessible without compromising on ethics or quality.
              We work directly with manufacturers to ensure fair labor practices and sustainable production methods. Our
              dedication to customer satisfaction drives everything we do, from product development to after-sales
              support.
            </p>

            <div className="flex justify-center">
              <Button className="bg-black text-white hover:bg-black/90">Shop Our Collection</Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Customer Service</h2>
            <p className="text-black mb-4">
              We pride ourselves on providing exceptional customer service. Our team is available to assist you with any
              questions or concerns about our products or services.
            </p>
            <p className="text-black font-medium">
              Email: support@luxeessentials.com
              <br />
              Phone: (555) 123-4567
              <br />
              Hours: Monday-Friday, 9am-5pm EST
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Visit Our Flagship Store</h2>
            <p className="text-black mb-4">
              Experience Luxe Essentials in person at our flagship store, where you can browse our full collection and
              receive personalized assistance from our knowledgeable staff.
            </p>
            <p className="text-black font-medium">
              123 Luxury Lane
              <br />
              New York, NY 10001
              <br />
              Hours: Monday-Saturday, 10am-7pm
              <br />
              Sunday, 12pm-5pm
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
