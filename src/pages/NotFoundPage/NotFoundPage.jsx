import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.blok}>
      <h3 className={css.message}>404 - Page Not Found</h3>
      <Link className={css.message} to="/">
        Go back to Home
      </Link>
    </div>
  );
};
export default NotFoundPage;