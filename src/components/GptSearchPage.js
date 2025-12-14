import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import {BG_URL} from "../utils/constant"

const GptSearchPage = () => {
  return (
    <div>
      <div className="absolute -z-10">
            <img className='h-screen w-screen'
            src={BG_URL}
            alt="netflix background"
            />
        </div>
        <GptSearchBar/>
        <GptMovieSuggestion/>
    </div>
  )
}

export default GptSearchPage