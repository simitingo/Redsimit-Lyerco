import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.message.deleteMany()
  await prisma.product.deleteMany()

  const products = [
    {
      name: 'Steam',
      description: 'Random Steam account with one paid game',
      price: 2.00,
      category: 'Steam Random',
      seller: 'Redsimit',
      imageUrl: 'https://www.inside-digital.de/img/steal-sale-header.jpg?class=1200x900',
    },
    {
      name: 'GTA 5',
      description: 'Gta 5 Steam account, Enchanced + Legacy',
      price: 5.00,
      category: 'Steam Games',
      seller: 'Redsimit',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsJTHSvL41_94GHKUD1laAhojXVN5Rr_8ig&s',
    },
    {
      name: 'Request Game',
      description: 'Request 1 game from steam',
      price: 2.00,
      category: 'Steam Request',
      seller: 'Redsimit',
      imageUrl: 'https://www.inside-digital.de/img/steal-sale-header.jpg?class=1200x900',
    },
    {
      name: 'Request 2 Games',
      description: 'Request 2 games from steam',
      price: 3.00,
      category: 'Steam Request',
      seller: 'Redsimit',
      imageUrl: 'https://www.inside-digital.de/img/steal-sale-header.jpg?class=1200x900',
    },
    {
      name: 'Random Steam Account (Multiple Games)',
      description: 'Multiple random',
      price: 8.00,
      category: 'Steam Random',
      seller: 'Redsimit',
      imageUrl: 'https://www.inside-digital.de/img/steal-sale-header.jpg?class=1200x900',
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
