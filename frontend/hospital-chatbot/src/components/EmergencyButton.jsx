import { AlertTriangle } from 'lucide-react'

export default function EmergencyButton({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed md:absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full shadow-lg z-50 transition-all duration-300
        ${active 
          ? 'bg-red-600 animate-pulse shadow-red-400/50' 
          : 'bg-white hover:bg-red-50 border-2 border-red-400'
        }`}
      aria-label={active ? 'Disable emergency mode' : 'Enable emergency mode'}
    >
      <AlertTriangle 
        size={24} 
        className={active ? 'text-white' : 'text-red-600'} 
      />
    </button>
  )
}