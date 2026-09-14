import { Clock, Calendar, User, Phone, Plus, MapPin, CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'
import dataService from '../services/dataService.js'

export default function QuickActions({ onSelect, emergency }) {
  const [actions, setActions] = useState([
    { text: "How many hospitals?", icon: <Plus size={16} /> },
    { text: "Apollo rating", icon: <User size={16} /> },
    { text: "Hospital in Chennai", icon: <MapPin size={16} /> },
    { text: "Patient satisfaction", icon: <Clock size={16} /> }
  ])

  useEffect(() => {
    // Load dynamic actions based on hospital data
    const hospitalInfo = dataService.getHospitalInfo()
    if (hospitalInfo) {
      const dynamicActions = [
        { text: "How many hospitals?", icon: <Plus size={16} /> },
        { text: "Apollo rating", icon: <User size={16} /> },
        { text: "Hospital in Chennai", icon: <MapPin size={16} /> },
        { text: "Patient satisfaction", icon: <Clock size={16} /> },
        { text: "JCI accreditation", icon: <Calendar size={16} /> },
        { text: "High priority alerts", icon: <Phone size={16} /> },
        { text: "Top 3 department revenue", icon: <CreditCard size={16} /> },
        { text: "Current occupancy rate", icon: <Clock size={16} /> }
      ]
      setActions(dynamicActions)
    }
  }, [])
  return (
    <div className="px-4 py-2 bg-white/80 border-t border-gray-200">
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onSelect(action.text)}
            className={`flex-shrink-0 flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all
              ${emergency 
                ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                : 'bg-blue-50 text-medical-primary hover:bg-blue-100'
              }`}
            style={{ minWidth: 'fit-content' }}
          >
            <span className="mr-2">{action.icon}</span>
            {action.text}
          </button>
        ))}
      </div>
    </div>
  )
}