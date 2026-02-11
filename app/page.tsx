'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import FilterPanel from '@/components/FilterPanel'
import { Product, FilterState } from '@/types'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: Infinity,
    category: '',
    seller: '',
    search: '',
  })

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch((error) => console.error('Failed to load products:', error))
  }, [])

  useEffect(() => {
    let filtered = products

    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    if (filters.seller) {
      filtered = filtered.filter((p) => p.seller === filters.seller)
    }

    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= (filters.maxPrice || Infinity)
    )

    setFilteredProducts(filtered)
  }, [filters, products])

  const categories = Array.from(new Set(products.map((p) => p.category)))
  const sellers = Array.from(new Set(products.map((p) => p.seller)))

  return (
    <div className="min-h-screen bg-black-primary">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              sellers={sellers}
            />
          </aside>

          <section className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
              <p className="text-gray-light">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-light text-lg">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
