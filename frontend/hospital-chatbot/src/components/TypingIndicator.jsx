export default function TypingIndicator() {
  return (
    <div className="flex items-center p-2 rounded-lg bg-blue-50 w-fit">
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-2 h-2 bg-medical-primary rounded-full animate-typing-dots"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-600">Hospital staff is typing...</span>
    </div>
  )
}