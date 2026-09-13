import { Stethoscope, Cross } from 'lucide-react'

export default function BotAvatar({ emergency }) {
  return (
    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${emergency ? 'bg-red-100' : 'bg-blue-100'} transition-colors`}>
      {emergency ? (
        <Cross size={20} className="text-red-600 animate-pulse" />
      ) : (
        <>
          <Stethoscope size={20} className="text-medical-primary" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-medical-accent rounded-full border-2 border-white animate-heartbeat"></div>
        </>
      )}
    </div>
  )
}