import { useEffect, useState, useRef } from 'react';
import {
  useParams,
  Outlet,
  useLocation,
  Link,
  NavLink,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../movielist-api';
import Loader from './../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const loadMovieDetails = async () => {
      setIsLoading(true);

      try {
        const data = await fetchMovieDetails(movieId);
        if (!data) throw new Error('Movie not found');
        setMovie(data);
      } catch (error) {
        setError(`Error fetching genres: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={css.error}>{error}</p>}

      <nav className={css.nav}>
        <Link to={backLink.current} className={css.link_button}>
          <button type="button" className={css.button}>
            Go back
          </button>
        </Link>
      </nav>

      <div className={css.block_dscr}>
        {movie && (
          <div className={css.block_dscr}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title || 'Movie poster'}
              className={css.moviePoster}
            />

            <div className={css.dscr}>
              <h2>
                {movie.title} ({movie.release_date?.split('-')[0] || 'N/A'})
              </h2>
              <p>User score: {movie.vote_average || 'N/A'}</p>
              <h3>Overview</h3>
              <p>{movie.overview || 'No overview available.'}</p>
              <h3>Genres</h3>
              <p>
                {movie.genres?.map(genre => genre.name).join(', ') ||
                  'No genres listed.'}
              </p>
            </div>
          </div>
        )}
      </div>

      <h3 className={css.subtitle}>Additional information</h3>

      <ul className={css.list}>
        <li>
          <nav className={css.nav}>
            <NavLink to="cast" className={buildLinkClass}>
              Cast
            </NavLink>
          </nav>
        </li>
        <li>
          <nav className={css.nav}>
            <NavLink to="reviews" className={buildLinkClass}>
              Reviews
            </NavLink>
          </nav>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;