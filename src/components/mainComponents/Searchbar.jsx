import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import css from '../Modules/ImageFinder.module.css';

const Searchbar = forwardRef(({ onSearch }, ref) => {
  const [searchQuery, setSearchQuery] = useState('');

  const inputRef = useRef();

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  useImperativeHandle(ref, () => ({
    clearInput() {
      setSearchQuery('');
    },
    focusInput() {
      inputRef.current.focus();
    },
  }));

  return (
    <form className={css.Searchbar} onSubmit={handleSubmit}>
    <label className={css.SearchbarLabel}>
    <button className={css.SearchbarButton} type="submit">Search</button>
    <input
    className={css.SearchFormInput}
    type="text"
    value={searchQuery}
    onChange={handleChange}
    placeholder="Search images..."
    ref={inputRef}
    />
    </label>
    </form>
  );
});

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};


export default Searchbar;
