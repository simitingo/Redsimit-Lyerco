'use client'

import { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Message } from '@/types'

interface ChatProps {
  productId: string
  productName: string
}

export default function Chat({ productId, productName }: ChatProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [isUsernameSet, setIsUsernameSet] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const socketInstance = io({
      path: '/api/socket',
    })

    socketInstance.on('connect', () => {
      socketInstance.emit('join-room', productId)
    })

    socketInstance.on('new-message', (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    setSocket(socketInstance)

    fetch(`/api/messages?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error('Failed to load messages:', error))

    return () => {
      socketInstance.emit('leave-room', productId)
      socketInstance.disconnect()
    }
  }, [productId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!socket || !newMessage.trim() || !isUsernameSet) return

    socket.emit('send-message', {
      productId,
      username,
      content: newMessage.trim(),
    })

    setNewMessage('')
  }

  const handleSetUsername = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setIsUsernameSet(true)
    }
  }

  if (!isUsernameSet) {
    return (
      <div className="bg-black-secondary border border-gray-dark rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Join Chat</h2>
        <form onSubmit={handleSetUsername} className="space-y-4">
          <div>
            <label className="block text-gray-light text-sm font-medium mb-2">
              Enter your username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 bg-gray-dark border border-gray-dark rounded text-white focus:outline-none focus:border-red-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-red-primary text-white rounded hover:bg-red-dark transition-colors font-medium"
          >
            Join Chat
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-black-secondary border border-gray-dark rounded-lg overflow-hidden">
      <div className="bg-gray-dark p-4 border-b border-gray-dark">
        <h2 className="text-lg font-bold text-white">Chat: {productName}</h2>
        <p className="text-sm text-gray-light">Chatting as: {username}</p>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.username === username ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.username === username
                  ? 'bg-red-primary text-white'
                  : 'bg-gray-dark text-gray-light'
              }`}
            >
              <p className="text-xs font-semibold mb-1">{message.username}</p>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-dark">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-dark border border-gray-dark rounded text-white focus:outline-none focus:border-red-primary"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-primary text-white rounded hover:bg-red-dark transition-colors font-medium"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
