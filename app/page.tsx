import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { DeveloperSection } from "@/components/developer-section"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  // Featured categories
  const categories = [
    { name: "Men", image: "/placeholder.svg", link: "/men" },
    { name: "Women", image: "/placeholder.svg", link: "/women" },
    { name: "Kids", image: "/placeholder.svg", link: "/kids" },
    { name: "Beauty", image: "/placeholder.svg", link: "/beauty" },
  ]

  // Featured products
  const featuredProducts = [
    {
      id: "1",
      name: "Classic White Shirt",
      brand: "FashioneZ Essentials",
      price: 1299,
      image: "/placeholder.svg",
      category: "men",
    },
    {
      id: "2",
      name: "Floral Summer Dress",
      brand: "Elegance",
      price: 1899,
      image: "/placeholder.svg",
      category: "women",
    },
    {
      id: "3",
      name: "Denim Jacket",
      brand: "Urban Style",
      price: 2499,
      image: "/placeholder.svg",
      category: "men",
    },
    {
      id: "4",
      name: "Casual Sneakers",
      brand: "Comfort Walk",
      price: 1599,
      image: "/placeholder.svg",
      category: "footwear",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-[60vh] bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background">
            <div className="container h-full flex flex-col justify-center">
              <div className="max-w-xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Discover Your Style</h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Shop the latest trends in fashion with FashioneZ. Free shipping on orders over ₹999.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg">
                    <Link href="/new-arrivals">Shop New Arrivals</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="/sale">Explore Sale</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link key={category.name} href={category.link} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Products</h2>
              <Button variant="link" asChild>
                <Link href="/products">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotion Banner */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="relative overflow-hidden rounded-lg bg-primary/10 dark:bg-primary/5">
              <div className="px-6 py-12 md:p-12 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">Summer Sale is Live!</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                  Enjoy up to 50% off on selected items. Limited time offer.
                </p>
                <Button size="lg" asChild>
                  <Link href="/sale">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <DeveloperSection />
      </main>
      <Footer />
    </div>
  )
}
