#!/bin/bash

echo "🔴 Red Market - Setup Script"
echo "============================"
echo ""

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push

echo ""
echo "🌱 Seeding database with sample products..."
npx tsx prisma/seed.ts

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📱 Then open http://localhost:3000 in your browser"
echo ""
