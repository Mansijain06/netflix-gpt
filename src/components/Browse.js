import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearchPage from './GptSearchPage';

import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from '../hooks/usePopularMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTopratedMovies from '../hooks/useTopratedMovies';
import { useSelector } from 'react-redux';

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useUpcomingMovies();
    useTopratedMovies();
    const isGptSearch = useSelector(store => store.gpt?.showGptSearch);
  return (
    <div>
        <Header/>
        {
          isGptSearch ? <GptSearchPage/> :
          <>
            <MainContainer/>
            <SecondaryContainer/>
          </>
        }
    </div>
  )
}

export default Browse