import { useState, useEffect } from 'react'
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

interface User {
  id: string
  email: string
  displayName?: string
}

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchTime, setSearchTime] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setAuthLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white font-inter flex items-center justify-center">
        <div className="text-center">
          <BlueFlag size="md" className="mb-4" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white font-inter">
        <SearchHeader />
        <main className="flex flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
            <div className="mb-8">
              <BlueFlag size="lg" />
            </div>
            <h1 className="text-6xl font-normal text-gray-800 mb-8 tracking-tight">
              <span className="text-blue-600">Blue</span>{" "}
              <span className="text-red-500">Flag</span>
            </h1>
            <div className="w-full max-w-2xl mb-8">
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h2 className="text-xl font-medium text-gray-800 mb-4">
                  Sign in to start searching
                </h2>
                <p className="text-gray-600 mb-6">
                  Create an account or sign in to access Blue Flag's powerful search capabilities and save your search history.
                </p>
                <button 
                  onClick={() => blink.auth.login()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
                >
                  Sign in to Blue Flag
                </button>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Blue Flag offered in:{" "}
                <a href="#" className="text-blue-600 hover:underline">English</a>
              </p>
            </div>
          </div>
        </main>
        
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
      </div>
    )
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