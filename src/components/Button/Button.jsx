import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ incrementPage }) => {
  return (
    <button onClick={incrementPage} type="button" className={css.Button}>
      Load more
    </button>
  );
};

Button.propTypes = { incrementPage: PropTypes.func.isRequired };