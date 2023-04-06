import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';


export const Searchbar = ({ handlFormSubmirt }) => {
  const [searchimg, setSearchimg] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    const searchQuery = evt.target.elements.searchimg.value.trim();
    handlFormSubmirt(searchQuery);
    reset();
  };

  const handleChange = evt => {
    setSearchimg(evt.target.value);
  };


  const reset = () => {
    setSearchimg('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          name="searchimg"
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchimg}
        />
      </form>
    </header>
  );
};



Searchbar.propTypes = { handlFormSubmirt: PropTypes.func.isRequired };
