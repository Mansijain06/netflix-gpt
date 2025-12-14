import React from 'react';
import {lang} from "../utils/languageConstants";
import { useSelector } from 'react-redux';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config?.lang);

  return (
    <div className="flex justify-center">
        <form action="" className="bg-black p-3 mt-[10%] flex gap-4 w-[50%] justify-center">
            <input type="text" className='rounded p-2 w-[90%]' placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className='bg-red-700 text-white py-2 px-4 rounded-lg'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar