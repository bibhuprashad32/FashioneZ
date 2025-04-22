import { ProductCard } from "@/components/product-card"

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
  sizes?: string[]
  colors?: string[]
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
