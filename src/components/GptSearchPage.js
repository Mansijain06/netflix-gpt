import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import {BG_URL} from "../utils/constant"

const GptSearchPage = () => {
  return (
    <div>
      <div className="fixed -z-10">
          <img className='h-screen w-screen object-cover'
          src={BG_URL}
          alt="netflix background"
          />
      </div>
      <div className='pt-[30%] md:pt-0'>
        <GptSearchBar/>
        <GptMovieSuggestion/>
      </div>
    </div>
  )
}

export default GptSearchPage