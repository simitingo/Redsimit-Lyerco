import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { NextApiResponse } from 'next'
import { prisma } from './prisma'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer
    }
  }
}

export const initSocket = (res: NextApiResponseServerIO): SocketIOServer => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      socket.on('join-room', (productId: string) => {
        socket.join(productId)
      })

      socket.on('leave-room', (productId: string) => {
        socket.leave(productId)
      })

      socket.on('send-message', async (data: { productId: string; username: string; content: string }) => {
        try {
          const message = await prisma.message.create({
            data: {
              content: data.content,
              username: data.username,
              productId: data.productId,
            },
          })

          io.to(data.productId).emit('new-message', message)
        } catch (error) {
          socket.emit('error', { message: 'Failed to send message' })
        }
      })
    })

    res.socket.server.io = io
  }

  return res.socket.server.io
}
