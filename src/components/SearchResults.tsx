import { MoreVertical } from 'lucide-react'
import { Button } from './ui/button'

interface SearchResult {
  title: string
  url: string
  snippet: string
  displayUrl: string
}

interface SearchResultsProps {
  results: SearchResult[]
  searchTime: number
  totalResults: number
  loading?: boolean
}

export default function SearchResults({ results, searchTime, totalResults, loading = false }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="w-full max-w-2xl">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="mb-8 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="text-sm text-gray-600 mb-6">
        About {totalResults.toLocaleString()} results ({searchTime} seconds)
      </div>
      
      <div className="space-y-8">
        {results.map((result, index) => (
          <div key={index} className="group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="text-sm text-gray-600 mr-2">{result.displayUrl}</span>
                  <Button variant="ghost" size="sm" className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-xl text-blue-700 hover:underline cursor-pointer mb-1">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline focus:underline active:text-blue-900 transition-colors"
                  >
                    {result.title}
                  </a>
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {result.snippet}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-12 mb-8">
        <div className="flex items-center space-x-1">
          <span className="text-4xl text-blue-600 font-bold mr-8">Blue Flag</span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "ghost"}
              size="sm"
              className={`w-10 h-10 ${page === 1 ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`}
            >
              {page}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 ml-4">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}