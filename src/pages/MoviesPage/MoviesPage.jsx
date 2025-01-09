import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchSearchMovies } from '../../movielist-api';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import LoadMoreBtn from './../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from './../../components/Loader/Loader';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const query = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSearchMovies(query, page);

        setSearchMovies(prevMovies =>
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

    searchMovies();
  }, [query, page]);

  if (page > 1) {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  }

  const handleLoadMore = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', page + 1);
      return newParams;
    });
  };

  return (
    <div className={css.container}>
      <SearchBar setSearchParams={setSearchParams} />
      {isLoading && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={css.error}>{error}</p>}

      {!isLoading && query && searchMovies.length === 0 ? (
        <p className={css.subtitle}>No movies found for query: {query}</p>
      ) : (
        <>
          <MovieList movies={searchMovies} />
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

export default MoviesPage;