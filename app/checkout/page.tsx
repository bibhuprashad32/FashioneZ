import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PaymentForm } from "@/components/payment-form"
import { OrderSummary } from "@/components/order-summary"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentForm />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
