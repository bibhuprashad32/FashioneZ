import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderSummary() {
  // Sample order items data
  const orderItems = [
    {
      id: "1",
      name: "Classic White Shirt",
      price: 1299,
      quantity: 1,
    },
    {
      id: "3",
      name: "Denim Jacket",
      price: 2499,
      quantity: 1,
    },
  ]

  // Calculate totals
  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
