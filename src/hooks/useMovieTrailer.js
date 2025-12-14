import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from '../utils/constant';

const useMovieTrailer = (movieId) => {
    const trailerVideo = useSelector(store => store.movies.trailerVideo);
    const dispatch = useDispatch();

    const getMovieVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // setTrailerId(trailer.key);
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        if(!trailerVideo)
            getMovieVideo();
    }, []);
}

export default useMovieTrailer