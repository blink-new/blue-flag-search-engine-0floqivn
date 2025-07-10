import { Flag } from 'lucide-react'

interface BlueFlagProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function BlueFlag({ size = 'lg', className = '' }: BlueFlagProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  const textSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <Flag className={`${sizeClasses[size]} text-blue-600 transform rotate-12`} fill="currentColor" />
        <div className={`absolute inset-0 flex items-center justify-center ${textSizes[size]} font-bold text-white mix-blend-difference`}>
          B
        </div>
      </div>
    </div>
  )
}