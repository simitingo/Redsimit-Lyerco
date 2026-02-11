'use client'

import { FilterState } from '@/types'

interface FilterPanelProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  categories: string[]
  sellers: string[]
}

export default function FilterPanel({ filters, onFilterChange, categories, sellers }: FilterPanelProps) {
  return (
    <div className="bg-black-secondary border border-gray-dark rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Filters</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-light text-sm font-medium mb-2">
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search products..."
            className="w-full px-4 py-2 bg-gray-dark border border-gray-dark rounded text-white focus:outline-none focus:border-red-primary"
          />
        </div>

        <div>
          <label className="block text-gray-light text-sm font-medium mb-2">
            Price Range
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) })}
              placeholder="Min"
              className="w-full px-4 py-2 bg-gray-dark border border-gray-dark rounded text-white focus:outline-none focus:border-red-primary"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
              placeholder="Max"
              className="w-full px-4 py-2 bg-gray-dark border border-gray-dark rounded text-white focus:outline-none focus:border-red-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-light text-sm font-medium mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2 bg-gray-dark border border-gray-dark rounded text-white focus:outline-none focus:border-red-primary"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-light text-sm font-medium mb-2">
            Seller
          </label>
          <select
            value={filters.seller}
            onChange={(e) => onFilterChange({ ...filters, seller: e.target.value })}
            className="w-full px-4 py-2 bg-gray-dark border border-gray-dark rounded text-white focus:outline-none focus:border-red-primary"
          >
            <option value="">All Sellers</option>
            {sellers.map((seller) => (
              <option key={seller} value={seller}>
                {seller}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            onFilterChange({
              minPrice: 0,
              maxPrice: Infinity,
              category: '',
              seller: '',
              search: '',
            })
          }
          className="w-full px-4 py-2 bg-red-primary text-white rounded hover:bg-red-dark transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
