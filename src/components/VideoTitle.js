import React from 'react'

const VideoTitle = ({title, overview}) => {

  return (
    <div className='w-screen aspect-video bg-gradient-to-r from-black pt-[20%] px-12 absolute text-white'>
        <h1 className='text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4 line-clamp-2 md:line-clamp-3'>{overview}</p>
        <div className='flex gap-4 mt-3'>
            <button className='bg-white text-slate-700 p-3 font-bold rounded-lg cursor-pointer hover:bg-opacity-80'>► Play</button>
            <button className='bg-slate-500 opacity-70 text-white px-6 rounded-lg cursor-pointer hover:bg-opacity-80'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle