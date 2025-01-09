import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchTrendingMovies } from '../../movielist-api';
import MovieList from './../../components/MovieList/MovieList';
import LoadMoreBtn from './../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from './../../components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchTrendingMovies(page);

        setTrendingMovies(prevMovies =>
          page === 1 ? data.movies : [...prevMovies, ...data.movies]
        );

        setTotalPages(data.totalPages);

        if (page >= data.totalPages) {
          toast("We're sorry, but you've reached the end of search results.");
        }
      } catch (error) {
        setError(`Unable to load movies: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [trendingMovies, page]);

  const handleLoadMore = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', page + 1);
      return newParams;
    });
  };

  return (
    <div className={css.container}>
      {error && <p className={css.error}>{error}</p>}

      {!isLoading && trendingMovies.length === 0 ? (
        <p className={css.subtitle}>No Trending movies</p>
      ) : (
        <>
          <h2 className={css.title}>Trending today</h2>
          <MovieList movies={trendingMovies} />
          {page < totalPages && (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <LoadMoreBtn onClick={handleLoadMore} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;