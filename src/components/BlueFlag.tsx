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

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded-sm border border-gray-300 shadow-sm`}>
        {/* Scottish flag background (blue) */}
        <div className="absolute inset-0 bg-blue-600"></div>
        
        {/* White diagonal cross (St. Andrew's Cross) */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Diagonal line from top-left to bottom-right */}
          <line 
            x1="0" 
            y1="0" 
            x2="100" 
            y2="100" 
            stroke="white" 
            strokeWidth="8"
          />
          {/* Diagonal line from top-right to bottom-left */}
          <line 
            x1="100" 
            y1="0" 
            x2="0" 
            y2="100" 
            stroke="white" 
            strokeWidth="8"
          />
        </svg>
      </div>
    </div>
  )
}