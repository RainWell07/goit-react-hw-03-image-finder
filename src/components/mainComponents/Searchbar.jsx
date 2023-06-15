import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../Modules/ImageFinder.module.css';

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
    }
  };

  return (
    <form className={css.Searchbar} onSubmit={handleSubmit}>
      <label className={css.SearchbarLabel}>
        <button className={css.SearchbarButton} type="submit">
          Search
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search images..."
        />
      </label>
    </form>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
