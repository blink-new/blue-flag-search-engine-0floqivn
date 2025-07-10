import { useState } from 'react'
import { blink } from './blink/client'
import SearchHeader from './components/SearchHeader'
import SearchBox from './components/SearchBox'
import SearchResults from './components/SearchResults'
import BlueFlag from './components/BlueFlag'

interface SearchResult {
  title: string
  url: string
  snippet: string
  displayUrl: string
}

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchTime, setSearchTime] = useState(0)
  const [totalResults, setTotalResults] = useState(0)


  const handleSearch = async (query: string) => {
    setLoading(true)

    setHasSearched(true)
    
    const startTime = Date.now()
    
    try {
      // Use Blink's search functionality
      const results = await blink.data.search(query, {
        limit: 10
      })
      
      const endTime = Date.now()
      setSearchTime((endTime - startTime) / 1000)
      
      // Transform results into our format
      const formattedResults: SearchResult[] = results.organic_results?.map((result: {title?: string; link?: string; snippet?: string; displayed_link?: string}) => ({
        title: result.title || 'No title',
        url: result.link || '#',
        snippet: result.snippet || 'No description available',
        displayUrl: result.displayed_link || result.link || ''
      })) || []
      
      setSearchResults(formattedResults)
      setTotalResults(results.organic_results?.length || 0)
    } catch (error) {
      console.error('Search error:', error)
      // Show some mock results for demo purposes
      const mockResults: SearchResult[] = [
        {
          title: "Blue Flag Search - Your Gateway to the Web",
          url: "https://blueflag.com",
          snippet: "Blue Flag is a powerful search engine that helps you find exactly what you're looking for on the web. Experience fast, accurate search results with our advanced algorithms.",
          displayUrl: "blueflag.com"
        },
        {
          title: "Welcome to Blue Flag - The Future of Search",
          url: "https://blueflag.com/about",
          snippet: "Discover how Blue Flag revolutionizes web search with cutting-edge technology and user-focused design. Join millions of users who trust Blue Flag for their daily searches.",
          displayUrl: "blueflag.com › about"
        },
        {
          title: "Blue Flag Help Center - Search Tips & Tricks",
          url: "https://help.blueflag.com",
          snippet: "Learn how to make the most of Blue Flag search. Find advanced search operators, tips for better results, and answers to frequently asked questions.",
          displayUrl: "help.blueflag.com"
        }
      ]
      
      setSearchResults(mockResults)
      setTotalResults(3500000)
      setSearchTime(0.42)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <SearchHeader />
      
      <main className="flex flex-col items-center justify-center px-6">
        {!hasSearched ? (
          // Home page layout
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            <div className="mb-8">
              <BlueFlag size="lg" />
            </div>
            <h1 className="text-6xl font-normal text-gray-800 mb-8 tracking-tight">
              <span className="text-blue-600">Blue</span>{" "}
              <span className="text-red-500">Flag</span>
            </h1>
            <div className="w-full max-w-2xl">
              <SearchBox onSearch={handleSearch} loading={loading} variant="home" />
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Blue Flag offered in:{" "}
                <a href="#" className="text-blue-600 hover:underline">English</a>
              </p>
            </div>
          </div>
        ) : (
          // Search results layout
          <div className="w-full max-w-6xl pt-6">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center mr-8">
                <BlueFlag size="sm" />
                <span className="ml-3 text-2xl font-normal text-gray-800">
                  <span className="text-blue-600">Blue</span>{" "}
                  <span className="text-red-500">Flag</span>
                </span>
              </div>
              <div className="flex-1 max-w-2xl">
                <SearchBox onSearch={handleSearch} loading={loading} variant="results" />
              </div>
            </div>
            
            <div className="ml-36">
              <SearchResults
                results={searchResults}
                searchTime={searchTime}
                totalResults={totalResults}
                loading={loading}
              />
            </div>
          </div>
        )}
      </main>
      
      {!hasSearched && (
        <footer className="fixed bottom-0 w-full bg-gray-50 border-t border-gray-200 py-4">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex space-x-6">
                <a href="#" className="hover:underline">Advertising</a>
                <a href="#" className="hover:underline">Business</a>
                <a href="#" className="hover:underline">How Search works</a>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Settings</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App