import React, {useEffect} from 'react';
import { API_OPTIONS } from '../utils/constant';
import { addTopRatedMovies } from '../utils/moviesSlice';
import { useDispatch } from 'react-redux';

const useTopratedMovies = () => {
   const dispatch = useDispatch(); 
    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS)
        const json = await data.json();
        console.log("toprated", json);
        dispatch(addTopRatedMovies(json.results));
    }

    useEffect(() => {
        getTopRatedMovies();
    }, []); 
}

export default useTopratedMovies;