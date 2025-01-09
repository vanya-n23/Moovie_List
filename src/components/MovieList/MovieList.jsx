import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title }) => (
        <li key={id} className={css.movieItem}>
          <h3 className={css.subtitle}>
            <Link
              to={`/movies/${id}`}
              state={{ from: location }}
              className={css.movieLink}
            >
              {title}
            </Link>
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;