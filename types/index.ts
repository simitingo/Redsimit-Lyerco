export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  seller: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  content: string
  username: string
  productId: string
  createdAt: Date
}

export interface FilterState {
  minPrice: number
  maxPrice: number
  category: string
  seller: string
  search: string
}
