import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Navigation from '../Navigation/Navigation';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import css from './App.module.css';

const HomePage = lazy(() => import('./../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() =>
  import('./../../pages/NotFoundPage/NotFoundPage')
);

const App = () => {
  return (
    <div className={css.container}>
      <Navigation />
      <Toaster
        position="top-center"
        toastOptions={{ className: css.toasterContainer }}
      />

      <Suspense fallback={<Loader className={css.loading} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <ScrollToTopButton />
    </div>
  );
};

export default App;