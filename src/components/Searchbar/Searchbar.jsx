import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchimg: '',
  };
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handelSubmit = e => {
    e.preventDefault();

    if (this.state.searchimg.trim() === '') {
      alert('No search value!');
      return;
    }
    this.props.handlFormSubmirt(this.state.searchimg);
    this.setState({ searchimg: '' });
    this.reset();
  };

  reset = () => {
    this.setState({ searchimg: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handelSubmit}>
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
            onChange={this.handleChange}
            value={this.state.searchimg}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { handlFormSubmirt: PropTypes.func.isRequired };