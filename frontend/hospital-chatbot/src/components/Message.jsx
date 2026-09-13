import { useEffect, useRef } from 'react'
import { User, Bot } from 'lucide-react'

export default function Message({ message, emergency }) {
  const messageRef = useRef(null)
  
  useEffect(() => {
    // Animation on mount
    if (messageRef.current) {
      messageRef.current.style.opacity = '0'
      messageRef.current.style.transform = message.isUser 
        ? 'translateX(20px)' 
        : 'translateX(-20px)'
      
      setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.style.opacity = '1'
          messageRef.current.style.transform = 'translateX(0)'
          messageRef.current.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
      }, 50)
    }
  }, [])

  return (
    <div 
      ref={messageRef}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start max-w-xs ${message.isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${message.isUser ? 'bg-gray-200 ml-2' : emergency ? 'bg-red-100 mr-2' : 'bg-blue-100 mr-2'}`}>
          {message.isUser ? (
            <User size={16} className={emergency ? 'text-red-600' : 'text-blue-600'} />
          ) : (
            <Bot size={16} className={emergency ? 'text-red-600' : 'text-blue-600'} />
          )}
        </div>
        <div
          className={`px-4 py-2 rounded-lg ${message.isUser
            ? emergency
              ? 'bg-red-500 text-white rounded-tr-none'
              : 'bg-medical-primary text-white rounded-tr-none'
            : emergency
              ? 'bg-red-100 text-red-900 rounded-tl-none border border-red-200'
              : 'bg-blue-50 text-gray-800 rounded-tl-none border border-blue-100'
          }`}
        >
          <p className="text-sm">{message.text}</p>
          <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  )
}