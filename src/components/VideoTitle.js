import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MovieDetailsModal from './MovieDetailsModal';

const VideoTitle = ({title, overview, movieId}) => {
  const [showModal, setShowModal] = useState(false);
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);

  const handlePlay = () => {
    if (trailerVideo?.key) {
      // Open YouTube video in a new tab
      window.open(`https://www.youtube.com/watch?v=${trailerVideo.key}`, '_blank');
    } else {
      // Fallback: Scroll to the video player if trailer not loaded yet
      const videoElement = document.querySelector('iframe');
      if (videoElement) {
        videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        videoElement.focus();
      }
    }
  };

  const handleMoreInfo = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className='w-screen aspect-video bg-gradient-to-r from-black pt-[20%] px-12 absolute text-white'>
          <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
          <p className='hidden py-6 text-lg w-1/3 md:w-1/4 md:line-clamp-2'>{overview}</p>
          <div className='flex gap-4 mt-3'>
              <button 
                onClick={handlePlay}
                className='bg-white text-slate-700 p-2 md:p-3 font-bold rounded-lg cursor-pointer hover:bg-opacity-80 flex items-center gap-2'
              >
                <span>►</span> Play
              </button>
              <button 
                onClick={handleMoreInfo}
                className='bg-slate-500 opacity-70 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg cursor-pointer hover:bg-opacity-80 flex items-center gap-2'
              >
                <span>ℹ</span> More Info
              </button>
          </div>
      </div>
      {showModal && (
        <MovieDetailsModal movieId={movieId} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

export default VideoTitle