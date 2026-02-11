'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black-secondary border-b border-gray-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-red-primary">
            Red Market
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-light hover:text-white transition-colors">
              Products
            </Link>
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/SK8kNwx9Uz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-dark text-gray-light hover:bg-black-primary transition-colors rounded"
              >
                Discord
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-dark text-gray-light hover:bg-black-primary transition-colors rounded"
              >
                Instagram
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
