import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-black">My Orders</h1>

      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="orders" className="text-black">
            Track Order
          </TabsTrigger>
          <TabsTrigger value="returns" className="text-black">
            Returns & Refunds
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Track Your Order</h2>
          <p className="text-black mb-4">Enter your order number to track the status of your purchase.</p>

          <form className="space-y-4">
            <div>
              <label htmlFor="order-id" className="block text-sm font-medium text-black mb-1">
                Order ID
              </label>
              <input
                id="order-id"
                type="text"
                placeholder="e.g., ORD-12345"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                required
              />
            </div>

            <Button type="submit" className="bg-black text-white hover:bg-black/90">
              Track Order
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="returns" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Returns & Refunds</h2>
          <p className="text-black mb-6">
            Return requests must be submitted within 48 hours of receiving your order. All items must be in their
            original packaging and unworn/unused condition. Please note that shipping costs are non-refundable.
          </p>

          <Button className="bg-[#e9d8fd] hover:bg-[#d6bcfa] text-black font-medium py-2 px-4 rounded-md shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.3)] transition-all mb-8">
            Start New Return
          </Button>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4 text-black">Return Form</h3>

            <form className="space-y-4">
              <div>
                <label htmlFor="return-order-id" className="block text-sm font-medium text-black mb-1">
                  Order ID
                </label>
                <input
                  id="return-order-id"
                  type="text"
                  placeholder="e.g., ORD-12345"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="product" className="block text-sm font-medium text-black mb-1">
                  Product
                </label>
                <select id="product" className="w-full p-2 border border-gray-300 rounded-md text-black" required>
                  <option value="">Select a product</option>
                  <option value="product-1">Luxe Essential T-Shirt</option>
                  <option value="product-2">Premium Denim Jeans</option>
                  <option value="product-3">Cashmere Sweater</option>
                </select>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-black mb-1">
                  Reason for Return
                </label>
                <select id="reason" className="w-full p-2 border border-gray-300 rounded-md text-black" required>
                  <option value="">Select a reason</option>
                  <option value="wrong-size">Wrong Size</option>
                  <option value="damaged">Damaged/Defective</option>
                  <option value="not-as-described">Not as Described</option>
                  <option value="changed-mind">Changed Mind</option>
                </select>
              </div>

              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-black mb-1">
                  Additional Comments
                </label>
                <textarea
                  id="comments"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                ></textarea>
              </div>

              <Button type="submit" className="bg-black text-white hover:bg-black/90">
                Submit Return Request
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
