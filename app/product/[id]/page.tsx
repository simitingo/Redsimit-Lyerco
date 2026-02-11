'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Chat from '@/components/Chat'
import { Product } from '@/types'

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found')
        return res.json()
      })
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load product:', error)
        setLoading(false)
      })
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black-primary">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-light">Loading...</div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black-primary">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-light">Product not found</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black-primary">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-black-secondary border border-gray-dark rounded-lg overflow-hidden">
            <div className="relative w-full h-96">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="bg-black-secondary border border-gray-dark rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-red-primary text-4xl font-bold mb-6">
              ${product.price.toFixed(2)}
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-gray-light text-sm">Category:</span>
                <span className="text-white ml-2">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-light text-sm">Seller:</span>
                <span className="text-white ml-2">{product.seller}</span>
              </div>
            </div>
            <div className="border-t border-gray-dark pt-6">
              <h2 className="text-lg font-semibold text-white mb-3">Description</h2>
              <p className="text-gray-light leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Chat productId={product.id} productName={product.name} />
        </div>
      </main>
    </div>
  )
}
