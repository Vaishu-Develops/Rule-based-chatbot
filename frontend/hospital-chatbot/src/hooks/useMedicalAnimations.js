import { useEffect } from 'react'

export default function useMedicalAnimations() {
  const animateHeartbeat = (element) => {
    if (!element) return
    
    const keyframes = [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' },
      { transform: 'scale(1.02)' },
      { transform: 'scale(1)' }
    ]
    
    const options = {
      duration: 1500,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
    
    element.animate(keyframes, options)
  }

  const animateBreathing = (element) => {
    if (!element) return
    
    const keyframes = [
      { opacity: 0.9 },
      { opacity: 1 },
      { opacity: 0.9 }
    ]
    
    const options = {
      duration: 4000,
      iterations: Infinity,
      easing: 'ease-out'
    }
    
    element.animate(keyframes, options)
  }

  return { animateHeartbeat, animateBreathing }
}