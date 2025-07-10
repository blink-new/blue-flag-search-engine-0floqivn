import { useState, useEffect } from 'react'
import { User, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { blink } from '../blink/client'

interface User {
  id: string
  email: string
  displayName?: string
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleSignIn = () => {
    blink.auth.login()
  }

  const handleSignOut = async () => {
    try {
      await blink.auth.logout()
      // Redirect to home page after logout
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" className="p-2" disabled>
        <User className="h-5 w-5 text-gray-400" />
      </Button>
    )
  }

  if (!user) {
    return (
      <Button 
        onClick={handleSignIn}
        size="sm" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
      >
        Sign in
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 rounded-full hover:bg-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-medium text-gray-900">
            {user.displayName || 'User'}
          </p>
          <p className="text-sm text-gray-600 truncate">
            {user.email}
          </p>
        </div>
        <DropdownMenuItem className="px-4 py-2 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Account settings
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2 cursor-pointer">
          Search history
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="px-4 py-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}