import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, AlertTriangle, X } from 'lucide-react'
import Message from '../Message'
import QuickActions from '../QuickActions'
import EmergencyButton from '../EmergencyButton'
import TypingIndicator from '../TypingIndicator'
import BotAvatar from '../BotAvatar'
import useMedicalAnimations from '../../hooks/useMedicalAnimations.js'
import dataService from '../../services/dataService.js'

export default function Chat({ onClose }) {
  // Chat component with onClose prop support
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef(null)

  const { animateHeartbeat, animateBreathing } = useMedicalAnimations()

  // Initialize data service and load hospital data
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true)
      try {
        await dataService.loadHospitalData()
        const hospitalInfo = dataService.getHospitalInfo()

        // Add welcome message
        setMessages([{
          id: 1,
          text: `Welcome to ${hospitalInfo.name}. How can I assist you today?`,
          isUser: false,
          timestamp: new Date()
        }])
      } catch (error) {
        console.error('Failed to initialize chat:', error)
        setMessages([{
          id: 1,
          text: "Welcome to Healing Wave Hospital. How can I assist you today?",
          isUser: false,
          timestamp: new Date()
        }])
      } finally {
        setIsLoading(false)
      }
    }

    initializeChat()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    
    // Show typing indicator
    setIsTyping(true)
    
    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(input),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (message) => {
    if (emergencyMode) {
      return "🚨 Emergency mode activated. Connecting you with our emergency response team now. For immediate assistance, please call 108 or go directly to our Emergency Department."
    }

    // Use data service to find appropriate response
    return dataService.findResponse(message)
  }

  const handleQuickAction = (action) => {
    // Map quick action to appropriate query
    const actionQueries = {
      "How many hospitals?": "How many total hospitals are there?",
      "Apollo rating": "What is Apollo Hospitals' rating?",
      "Hospital in Chennai": "Which hospital is in Chennai?",
      "Patient satisfaction": "What is the current patient satisfaction score?",
      "JCI accreditation": "Which hospital has JCI accreditation?",
      "High priority alerts": "Is there any high priority alert?",
      "Top 3 department revenue": "What percentage of total monthly revenue comes from the top 3 departments?",
      "Current occupancy rate": "What is today's occupancy rate?",
      "Hospital Hours": "What are your opening hours?",
      "Book Appointment": "I want to book an appointment",
      "Find a Doctor": "Help me find a doctor",
      "Contact Information": "How can I contact the hospital?",
      "Hospital Location": "Where is the hospital located?",
      "Billing & Insurance": "I have questions about billing and insurance"
    }

    const query = actionQueries[action] || action
    setInput(query)

    // Simulate user sending the message
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  return (
    <div className={`relative max-w-md mx-auto h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-xl 
      ${emergencyMode ? 'bg-red-50' : 'bg-white/90 backdrop-blur-md'} transition-all duration-300`}>
      
      {/* Header with medical theme */}
      <div className={`flex items-center justify-between p-4 ${emergencyMode ? 'bg-red-600' : 'bg-gradient-to-r from-medical-primary to-medical-secondary'} text-white`}>
        <div className="flex items-center">
          <div className="animate-heartbeat">
            <BotAvatar emergency={emergencyMode} />
          </div>
          <div className="ml-3">
            <h2 className="font-semibold">Healing Wave Hospital</h2>
            <div className="flex items-center text-sm">
              <span className={`w-2 h-2 rounded-full mr-2 ${emergencyMode ? 'bg-white animate-pulse' : 'bg-medical-accent animate-breathing'}`}></span>
              <span>{emergencyMode ? 'Emergency Mode' : 'Online'}</span>
            </div>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-white/90 to-blue-50/50 chat-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-primary mx-auto mb-2"></div>
              <p className="text-gray-600">Loading hospital information...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                emergency={emergencyMode}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {/* Quick actions */}
      <QuickActions 
        onSelect={handleQuickAction} 
        emergency={emergencyMode}
      />
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white/80">
        <div className="flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-medical-primary focus:border-transparent"
            placeholder="Type your message..."
            aria-label="Type your message"
          />
          <button
            onClick={handleSend}
            className={`p-3 rounded-r-lg ${emergencyMode ? 'bg-red-500 hover:bg-red-600' : 'bg-medical-primary hover:bg-medical-secondary'} text-white transition-colors`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {/* Emergency button */}
      <EmergencyButton 
        active={emergencyMode}
        onToggle={() => setEmergencyMode(!emergencyMode)}
      />
    </div>
  )
}
