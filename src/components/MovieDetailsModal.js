import React, { useEffect, useState } from 'react';
import { API_OPTIONS, IMG_CDN_URL } from '../utils/constant';

const MovieDetailsModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : movieDetails ? (
          <div className="relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 z-10"
            >
              ✕
            </button>

            {/* Backdrop Image */}
            {movieDetails.backdrop_path && (
              <div className="relative h-64 md:h-96">
                <img
                  src={IMG_CDN_URL + movieDetails.backdrop_path}
                  alt={movieDetails.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>
            )}

            {/* Movie Details */}
            <div className="p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {movieDetails.title}
              </h2>

              <div className="flex flex-wrap gap-4 mb-4 text-sm md:text-base">
                <span className="text-green-500 font-semibold">
                  {movieDetails.vote_average?.toFixed(1)} ⭐
                </span>
                <span>{movieDetails.release_date?.split('-')[0]}</span>
                <span>{movieDetails.runtime} min</span>
                {movieDetails.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gray-700 px-2 py-1 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {movieDetails.overview}
              </p>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {movieDetails.production_companies?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Production Companies:</h3>
                    <p className="text-gray-400">
                      {movieDetails.production_companies
                        .map((company) => company.name)
                        .join(', ')}
                    </p>
                  </div>
                )}
                {movieDetails.spoken_languages?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Languages:</h3>
                    <p className="text-gray-400">
                      {movieDetails.spoken_languages
                        .map((lang) => lang.english_name)
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">Failed to load movie details</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal;

