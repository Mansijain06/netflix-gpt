import React, { useRef, useState } from 'react';
import { lang } from "../utils/languageConstants";
import { useSelector, useDispatch } from 'react-redux';
import { searchMovies } from '../utils/aiSearch';
import { addGptMovieResult } from '../utils/gptSlice';
import { API_OPTIONS } from '../utils/constant';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config?.lang);
  const dispatch = useDispatch();
  const searchText = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGptSearchClick = async () => {
    // Prevent multiple simultaneous requests
    if (loading) return;
    
    // Clear previous errors
    setError(null);
    
    // Validate input
    if (!searchText.current.value.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);

    try {
      // Get movie recommendations from AI
      const movieNames = await searchMovies(searchText.current.value);
      console.log("Recommended Movies:", movieNames);

      // Search for each movie in TMDB API
      const moviePromises = movieNames.map(async (movieName) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&page=1`,
          API_OPTIONS
        );
        const data = await response.json();
        return data.results?.[0]; // Get first result
      });

      const movieResults = await Promise.all(moviePromises);
      
      // Filter out null results
      const validMovies = movieResults.filter(movie => movie !== null && movie !== undefined);
      // Store in Redux
      dispatch(addGptMovieResult({ movieNames, movieResults: validMovies }));
      
    } catch (err) {
      console.error('Search Error:', err);
      
      if (err.message?.includes('429') || err.message?.includes('quota')) {
        setError('Rate limit exceeded. Please wait a moment and try again.');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form 
        action="" 
        className="bg-black p-3 mt-[10%] flex gap-4 w-[50%] justify-center" 
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearchClick();
        }}
      >
        <input 
          ref={searchText} 
          type="text" 
          className='rounded p-2 w-[90%]' 
          placeholder={lang[langKey].gptSearchPlaceholder}
          disabled={loading}
        />
        <button 
          className={`text-white py-2 px-4 rounded-lg ${
            loading 
              ? 'bg-gray-600 cursor-not-allowed opacity-50' 
              : 'bg-red-700 hover:bg-red-800'
          }`}
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? 'Searching...' : lang[langKey].search}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-900 text-white rounded-lg max-w-[50%] text-center">
          {error}
        </div>
      )}
    </div>
  )
}

export default GptSearchBar