import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function WomenPage() {
  // Sample women's products data
  const products = [
    {
      id: "2",
      name: "Floral Summer Dress",
      brand: "Elegance",
      price: 1899,
      image: "/placeholder.svg",
      category: "women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Floral Print"],
    },
    {
      id: "4",
      name: "Casual Sneakers",
      brand: "Comfort Walk",
      price: 1599,
      image: "/placeholder.svg",
      category: "footwear",
      sizes: ["36", "37", "38", "39", "40"],
      colors: ["White", "Black"],
    },
    {
      id: "6",
      name: "Designer Handbag",
      brand: "Elegance",
      price: 2999,
      image: "/placeholder.svg",
      category: "accessories",
      sizes: ["One Size"],
      colors: ["Brown", "Black"],
    },
    {
      id: "8",
      name: "Casual Jeans",
      brand: "Urban Style",
      price: 1799,
      image: "/placeholder.svg",
      category: "women",
      sizes: ["26", "28", "30", "32", "34"],
      colors: ["Blue", "Black"],
    },
    {
      id: "10",
      name: "Formal Blouse",
      brand: "FashioneZ Essentials",
      price: 1299,
      image: "/placeholder.svg",
      category: "women",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["White", "Black", "Pink"],
    },
    {
      id: "12",
      name: "Stylish Sunglasses",
      brand: "Urban Style",
      price: 999,
      image: "/placeholder.svg",
      category: "accessories",
      sizes: ["One Size"],
      colors: ["Black", "Brown"],
    },
  ]

  // Filter options
  const filterOptions = {
    brands: ["FashioneZ Essentials", "Urban Style", "Comfort Walk", "Elegance"],
    sizes: ["XS", "S", "M", "L", "XL", "26", "28", "30", "32", "34", "36", "37", "38", "39", "40", "One Size"],
    colors: ["Black", "White", "Blue", "Pink", "Brown", "Floral Print"],
    deliveryTime: ["1-2 days", "3-5 days", "1 week"],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Women's Clothing</h1>

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
