import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function MenPage() {
  // Sample men's products data
  const products = [
    {
      id: "1",
      name: "Classic White Shirt",
      brand: "FashioneZ Essentials",
      price: 1299,
      image: "/placeholder.svg",
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White"],
    },
    {
      id: "3",
      name: "Denim Jacket",
      brand: "Urban Style",
      price: 2499,
      image: "/placeholder.svg",
      category: "men",
      sizes: ["M", "L", "XL"],
      colors: ["Blue"],
    },
    {
      id: "5",
      name: "Slim Fit Chinos",
      brand: "FashioneZ Essentials",
      price: 1499,
      image: "/placeholder.svg",
      category: "men",
      sizes: ["30", "32", "34", "36"],
      colors: ["Beige", "Navy", "Olive"],
    },
    {
      id: "7",
      name: "Casual Polo T-shirt",
      brand: "Comfort Wear",
      price: 899,
      image: "/placeholder.svg",
      category: "men",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Grey", "Blue", "Red"],
    },
    {
      id: "9",
      name: "Formal Blazer",
      brand: "Elegance",
      price: 3999,
      image: "/placeholder.svg",
      category: "men",
      sizes: ["38", "40", "42", "44"],
      colors: ["Black", "Navy"],
    },
    {
      id: "11",
      name: "Printed Casual Shirt",
      brand: "Urban Style",
      price: 1199,
      image: "/placeholder.svg",
      category: "men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Multi"],
    },
  ]

  // Filter options
  const filterOptions = {
    brands: ["FashioneZ Essentials", "Urban Style", "Comfort Wear", "Elegance"],
    sizes: ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38", "40", "42", "44"],
    colors: ["Black", "White", "Blue", "Grey", "Red", "Navy", "Beige", "Olive", "Multi"],
    deliveryTime: ["1-2 days", "3-5 days", "1 week"],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Men's Clothing</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <ProductFilters filterOptions={filterOptions} />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
