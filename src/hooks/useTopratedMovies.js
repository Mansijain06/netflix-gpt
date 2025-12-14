import React, {useEffect} from 'react';
import { API_OPTIONS } from '../utils/constant';
import { addTopRatedMovies } from '../utils/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';

const useTopratedMovies = () => {
    const topRatedMovies = useSelector(store => store.movies.topRatedMovies);
   const dispatch = useDispatch(); 
    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', API_OPTIONS)
        const json = await data.json();
        dispatch(addTopRatedMovies(json.results));
    }

    useEffect(() => {
        if(!topRatedMovies)
            getTopRatedMovies();
    }, []); 
}

export default useTopratedMovies;