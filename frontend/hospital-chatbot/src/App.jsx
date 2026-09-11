import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Chat from './components/Chat/Chat'
import { MessageCircle } from 'lucide-react'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Header />
        <main className="min-h-[80vh] py-8">
          {/* Your main content here */}
        </main>
        <Footer />
      </div>

      {/* Chat toggle button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300
          ${chatOpen ? 'bg-medical-primary' : 'bg-medical-accent animate-heartbeat'}`}
        aria-label={chatOpen ? 'Close chat' : 'Open chat'}
      >
        <MessageCircle 
          size={28} 
          className={`text-white transition-transform ${chatOpen ? 'rotate-90' : ''}`} 
        />
      </button>

      {/* Chat window */}
      <div className={`fixed bottom-24 right-8 z-40 transition-all duration-300 ease-in-out
        ${chatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <Chat onClose={() => setChatOpen(false)} />
      </div>
    </div>
  )
}