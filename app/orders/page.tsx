import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrdersList } from "@/components/orders-list"

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          <OrdersList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
