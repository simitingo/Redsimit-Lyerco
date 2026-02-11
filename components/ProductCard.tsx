'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-black-secondary border border-gray-dark rounded-lg overflow-hidden hover:border-red-primary transition-colors cursor-pointer">
        <div className="relative w-full h-48 bg-gray-dark">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized // ⚠️ This lets Next.js load any URL without errors
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
          <p className="text-gray-light text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-red-primary text-xl font-bold">${product.price.toFixed(2)}</span>
            <span className="text-gray-light text-xs">{product.category}</span>
          </div>
          <div className="mt-2 text-xs text-gray-light">
            Seller: {product.seller}
          </div>
        </div>
      </div>
    </Link>
  )
}
