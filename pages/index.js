import Head from 'next/head'
import React from 'react';
import SearchBar from '../components/SearchBar'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes';


export default function Home() {
  const [embedArray, setEmbedArray] = useState([])
  const [query, setQuery] = useState()
  const [current, setCurrent] = useState()
  const [status, setStatus] = useState('na')
  const {theme, setTheme } = useTheme("dark"); 
  
  
  useEffect(() => {
    setTheme('dark');
  }, []);

  useEffect(() => { //Search once user stops typing for 1000 ms
    const timeoutId = setTimeout(() =>  everything(current), 500);
    return () => clearTimeout(timeoutId);
  }, [current]);



  
  async function everything(query){

    if (query?.length > 1) {
      setEmbedArray([])
      const movieID = await getMovieID(query.toLowerCase())
      console.log("🚀 ~ file: index.js ~ line 15 ~ everything ~ movieID", movieID)
      
      
      const topCastsArray = await getTopCast(movieID)
      console.log("🚀 ~ file: index.js ~ line 17 ~ everything ~ topCastsArray", topCastsArray)
      setStatus("Fetching Top Actors...")
      
      asyncForEach(topCastsArray, async (actor) => { 
          let twitterID = await getTwitterIDByActor(actor)
          
          let tweetsArray = await getTweets(twitterID)
          console.log("🚀 ~ file: index.js ~ line 29 ~ everything ~ tweetsArray", tweetsArray)
          setStatus(`Fetching Tweets for ${actor}...`)

          asyncForEach(tweetsArray, async (tweet) => { //embed tweets for given array of tweets
            setStatus(`Embedding Tweets for ${actor}...`)
            let twitterEmbed = await getTweetEmbed(tweet, actor)
            setEmbedArray((oldArray) => [...oldArray, twitterEmbed])
            setStatus(`na`), () => setTimeout(() => {  setStatus('na') }, 2000)  
          })
        
      })
      
    }
    
  }
// 
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array?.length; index++) {
      await callback(array[index], index, array);
    }
  }


    function embedScript(){
      try {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-tweet")[0].appendChild(script)
        
      } catch (error) {
        
      }
      
    }

    async function getTweetEmbed(tweet, actor){ //ID of tweet, link to twitter profile
      const tweetEmbed = await fetch ("/api/getTweetEmbed", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({tweet: tweet, actor: actor}) 
      })
      let tweetEmbed_json = await tweetEmbed.json()
      console.log("🚀 ~ file: index.js ~ line 82 ~ getTweetEmbed ~ tweetEmbed_json", tweetEmbed_json)
      return tweetEmbed_json.embedSlice
      
  }

    async function getTweets(twitterID){
      const tweetsArray = await fetch ("/api/getTweets", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({twitterID: twitterID}) 
      })
      let tweetsArray_json = await tweetsArray.json()
      return tweetsArray_json.justTweets
  }


  async function getTwitterIDByActor(actor){
    const twitterID = await fetch ("/api/getTwitterIDByActor", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({actor: actor}) 
    })
    let twitterID_json = await twitterID.json()
    return twitterID_json.mostLikelyID
  }



  function filterTwitterSocial(socialsArray){
    let twitter
    console.log("🚀 ~ file: index.js ~ line 28 ~ filterTwitterSocial ~ socialsArray", typeof socialsArray)
    socialsArray.map(social => {
        if (social.includes('twitter')){
          twitter = social
        }
    })
    return twitter
  }
  
  async function getSocials(userID){
    const socialsArray = await fetch ("/api/getSocials", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userID: userID}) 
    })
    let socialsArray_json = await socialsArray.json()
    return socialsArray_json.socials
  }
  
  
  
  async function getTopCast(movieID) {
    const topCastArray = await fetch ("/api/getTopCasts", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({movieID: movieID}) 
    })
    let topCastArray_json = await topCastArray.json()
    return topCastArray_json.actorsArray
    }


  async function getMovieID(userQuery){
    const movieID = await fetch ("/api/getMovieID", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({userQuery: userQuery}) 
    })
    let movieID_json = await movieID.json()
    return movieID_json.movieID
  }
  



  return (
    <>
      <div className="h-screen max-w-7xl mx-auto px-7 sm:px-20 lg:px-8">
          <div className=" max-w-3xl mx-auto ">
            <h1 className="pt-20 !text-transparent text-4xl sm:text-7xl bg-clip-text bg-cover bg-center bg-gradient-to-r from-purple-400 via-sky-50 to-pink-300 p-3 text-black dark:text-white font-extrabold !text-opacity-100 text-center">What's the Cast of Your Favorite Movie Tweeting About?</h1>
            <h2 class={`${status.length < 3 ? 'invisible' : '' } text-slate-400 text-xl font-light text-opacity-80 text-center`}>{status}</h2>
            
              <SearchBar query={query} setQuery={setQuery} current={current} setCurrent={setCurrent}/>
              
              {
                embedArray?.length > 0 ? 
                
                embedArray.map((embed, index)=> {
                  
                  if(index == embedArray?.length){
                    setLoading(false)
                  }
                  embedScript()  
                  
                  return (
                    <>
                      <span 
                      className={`flex justify-center`} dangerouslySetInnerHTML={{__html: embed}} />
                    </>
                  )
                  
                }) 
                
                : null
              }

              
          </div>
      </div>
    </>
    
  )
}
