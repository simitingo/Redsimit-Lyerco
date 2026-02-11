import { NextApiRequest } from 'next'
import { NextApiResponseServerIO, initSocket } from '@/lib/socket'

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'GET' || req.method === 'POST') {
    if (!res.socket.server.io) {
      initSocket(res)
    }
    res.end()
  } else {
    res.status(405).end()
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
