import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WishlistItems } from "@/components/wishlist-items"

export default function WishlistPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
          <WishlistItems />
        </div>
      </main>
      <Footer />
    </div>
  )
}
