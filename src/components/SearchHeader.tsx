import { Grid3x3 } from 'lucide-react'
import { Button } from './ui/button'
import AuthButton from './AuthButton'

export default function SearchHeader() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <a href="#" className="text-sm text-gray-700 hover:underline">
          About
        </a>
        <a href="#" className="text-sm text-gray-700 hover:underline">
          Store
        </a>
      </div>
      
      <div className="flex items-center space-x-4">
        <a href="#" className="text-sm text-gray-700 hover:underline">
          Gmail
        </a>
        <a href="#" className="text-sm text-gray-700 hover:underline">
          Images
        </a>
        <Button variant="ghost" size="sm" className="p-2">
          <Grid3x3 className="h-5 w-5 text-gray-600" />
        </Button>
        <AuthButton />
      </div>
    </header>
  )
}