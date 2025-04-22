"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"

interface FilterOptions {
  brands: string[]
  sizes: string[]
  colors: string[]
  deliveryTime: string[]
}

interface ProductFiltersProps {
  filterOptions: FilterOptions
}

export function ProductFilters({ filterOptions }: ProductFiltersProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([])

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const toggleDelivery = (delivery: string) => {
    setSelectedDelivery((prev) => (prev.includes(delivery) ? prev.filter((d) => d !== delivery) : [...prev, delivery]))
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedDelivery([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["brands", "sizes", "colors", "delivery"]}>
        <AccordionItem value="brands">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filterOptions.brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {filterOptions.sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={selectedSizes.includes(size)}
                    onChecke
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() => toggleSize(size)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm font-normal cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filterOptions.colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => toggleColor(color)}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm font-normal cursor-pointer">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="delivery">
          <AccordionTrigger>Delivery Time</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filterOptions.deliveryTime.map((delivery) => (
                <div key={delivery} className="flex items-center space-x-2">
                  <Checkbox
                    id={`delivery-${delivery}`}
                    checked={selectedDelivery.includes(delivery)}
                    onCheckedChange={() => toggleDelivery(delivery)}
                  />
                  <Label htmlFor={`delivery-${delivery}`} className="text-sm font-normal cursor-pointer">
                    {delivery}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
