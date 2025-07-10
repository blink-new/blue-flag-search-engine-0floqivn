import { useState } from 'react'
import { Search, Mic, Camera } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface SearchBoxProps {
  onSearch: (query: string) => void
  loading?: boolean
  variant?: 'home' | 'results'
}

export default function SearchBox({ onSearch, loading = false, variant = 'home' }: SearchBoxProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const isHome = variant === 'home'

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto ${isHome ? '' : 'flex items-center'}`}>
      <div className={`relative ${isHome ? 'mb-8' : 'flex-1'}`}>
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Blue Flag or type a URL"
            className={`w-full pl-12 pr-24 py-3 text-lg border-gray-300 rounded-full shadow-lg focus:shadow-xl transition-shadow duration-200 ${
              isHome ? 'h-14' : 'h-12'
            }`}
          />
          <div className="absolute right-3 flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Mic className="h-5 w-5 text-gray-400" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Camera className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
      
      {isHome && (
        <div className="flex justify-center space-x-4">
          <Button
            type="submit"
            variant="outline"
            className="px-6 py-2 bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md transition-all duration-200"
            disabled={loading}
          >
            Blue Flag Search
          </Button>
        </div>
      )}
    </form>
  )
}