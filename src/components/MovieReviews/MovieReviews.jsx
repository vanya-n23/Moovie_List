import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { fetchMovieReviews } from '../../movielist-api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const loadMovieReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(`Error fetching MovieCast: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      {isLoading && (
        <div className={css.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={css.error}>{error}</p>}

      {!isLoading && !error && !movieReviews.length && (
        <p className={css.message}>We do not have any reviews for this movie</p>
      )}

      {!isLoading && !error && movieReviews.length > 0 && (
        <>
          <h3 className={css.subtitle}>Reviews: </h3>
          <ul className={css.reviewsList}>
            {movieReviews.map(({ id, author, content }) => (
              <li key={id} className={css.reviewsItem}>
                <p className={css.author}>Author: {author}</p>
                <p className={css.reviewsText}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieReviews;