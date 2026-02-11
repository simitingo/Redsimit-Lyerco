# Red Market

A modern, production-ready e-commerce platform with real-time chat functionality.

## Features

- **Product Catalog**: Browse products with advanced filtering (price, category, seller)
- **Real-time Chat**: Each product has its own chat room powered by Socket.IO
- **Responsive Design**: Clean, minimal design with red/black color scheme
- **Database**: SQLite with Prisma ORM
- **Type Safety**: Full TypeScript implementation
- **No Authentication Required**: Simple username-based chat system

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Real-time**: Socket.IO for WebSocket connections
- **Styling**: Tailwind CSS with custom red/black theme

## Color Palette

- Red Primary: `#b00020`
- Black Primary: `#0f0f0f`
- Black Secondary: `#1a1a1a`
- Gray Dark: `#1a1a1a`
- Gray Light: `#cfcfcf`
- White: `#ffffff`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client and create database:
```bash
npx prisma generate
npx prisma db push
```

3. Seed the database with sample products:
```bash
npx tsx prisma/seed.ts
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
red-market/
├── app/
│   ├── api/
│   │   ├── messages/          # Message API routes
│   │   └── products/          # Product API routes
│   ├── product/[id]/          # Product detail pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   ├── Chat.tsx               # Real-time chat component
│   ├── FilterPanel.tsx        # Product filter UI
│   ├── Header.tsx             # Site header
│   └── ProductCard.tsx        # Product card component
├── lib/
│   ├── prisma.ts              # Prisma client
│   └── socket.ts              # Socket.IO setup
├── pages/
│   └── api/
│       └── socket.ts          # Socket.IO API route
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── types/
│   └── index.ts               # TypeScript types
└── package.json
```

## Database Schema

### Product
- `id`: Unique identifier
- `name`: Product name
- `description`: Product description
- `price`: Product price
- `category`: Product category
- `seller`: Seller name
- `imageUrl`: Product image URL
- `createdAt`: Creation timestamp
- `updatedAt`: Update timestamp

### Message
- `id`: Unique identifier
- `content`: Message content
- `username`: Sender username
- `productId`: Related product ID
- `createdAt`: Creation timestamp

## API Routes

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product by ID

### Messages
- `GET /api/messages?productId=[id]` - Get messages for product

### WebSocket Events
- `join-room` - Join product chat room
- `leave-room` - Leave product chat room
- `send-message` - Send message to room
- `new-message` - Receive new message

## Features in Detail

### Advanced Filtering
- Price range slider
- Category dropdown
- Seller filter
- Search by name/description
- Real-time filter updates (no page reload)

### Real-time Chat
- Per-product chat rooms
- Username-based messaging (no login required)
- Message persistence in database
- Auto-scroll to latest message
- Clean message UI with timestamps

### Responsive Design
- Desktop-first approach
- Mobile-friendly layouts
- Consistent spacing and typography
- Professional color scheme

## Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` for production:
```env
DATABASE_URL="your-production-database-url"
NODE_ENV="production"
```

### Database Migration
For production databases (PostgreSQL, MySQL):
1. Update `prisma/schema.prisma` datasource
2. Run migrations:
```bash
npx prisma migrate dev
```

## Development

### Add New Products
Use the POST endpoint:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "category": "Category",
    "seller": "Seller Name",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

### Database Management
View database in Prisma Studio:
```bash
npx prisma studio
```

Reset database:
```bash
npx prisma db push --force-reset
npx tsx prisma/seed.ts
```

## Code Quality

- **TypeScript**: Strict type checking enabled
- **No console spam**: Clean production logs
- **Modular structure**: Separated components and utilities
- **Error handling**: Proper try-catch blocks
- **Clean code**: Clear naming conventions

## License

MIT
