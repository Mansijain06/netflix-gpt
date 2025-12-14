import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from "./MovieList"
const GptMovieSuggestion = () => {
  const {movieNames, movieResults} = useSelector(store => store.gpt); 

  console.log("movieResults", movieResults);
  if(!movieNames || !movieResults) return null;

  return (
    <div className='p-4 m-4 bg-black text-white opacity-80'>
      <h1 className='text-3xl font-bold mb-4'>Recommended Movies</h1>
      <div className='flex flex-wrap'>
        {movieNames.map((movieName, index) => {
          const movie = movieResults[index];
          // Wrap single movie in array and add safety check
          const moviesArray = movie ? [movie] : [];
          return (
            <MovieList 
              key={movieName + index} 
              title={movieName} 
              movies={moviesArray}
            />
          );
        })}
      </div>
    </div>
  )
}

export default GptMovieSuggestion