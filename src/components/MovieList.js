import MovieCard from './MovieCard';

const MovieList = ({title, movies}) => {
  return (
    <div className='flex flex-col p-4 w-20%' >
        <h1 className='text-sm md:text-xl font-bold py-1 text-white'>{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;