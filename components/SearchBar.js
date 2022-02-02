import { useState, useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/outline'


export default function SearchBar({query, setQuery, current, setCurrent}) {
  const [results, setResults] = useState()
  const [isTypingSearch, setIsTypingSearch] = useState(false)
  

  useEffect(() => { //Search once user stops typing for 1000 ms
    const timeoutId = setTimeout(() =>  getAllMoviesIDByQuery(query), 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    console.log("new results received", results)
    console.log("new results received", query)
  }, [results]);
  


  async function getAllMoviesIDByQuery(userQuery){
    const movieID = await fetch ("/api/getAllMoviesIDByQuery", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userQuery: userQuery}) 
    })
    let resultsArray = await movieID.json()
    setResults(resultsArray.movieIDs)
  }


    
    return (
        <div className='py-4'>
        <div className="mt-1 relative group rounded-md shadow-sm">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-300 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-200"></div>
          <div className="z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            className="relative pl-10 bg-black text-gray-400 block w-full text-md  rounded-md"
            placeholder="Search Any Movie or TV Show..."
            value={query}
            onChange={(e) => {
              setIsTypingSearch(true)
              setQuery(e.target.value.toLowerCase())}
            }
          />
        </div>


        {
          results?.length > 0  && isTypingSearch == true ? 
          results?.map(result => {
            return (
              <div 
              onClick={() => {
                setIsTypingSearch(false)
                setResults('')
                setCurrent(result.id)
                setQuery(result.l.toLowerCase())
              }}
              className='py-2 hover:bg-gray-600 flex hover:cursor-pointer items-center rounded-md'>
                <img className='w-16 p-2' src={result?.i?.imageUrl}/>
                <h1 className='pr-1'>{result?.l}</h1>
                <h1 className='pl-1'>{result?.y}</h1>
              </div>
            )
          })
          : null
        }
      </div>
    )
  }
  