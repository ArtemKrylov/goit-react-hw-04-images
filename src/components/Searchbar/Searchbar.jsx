import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdOutlineImageSearch } from 'react-icons/md';

import { isStringEmpty } from 'utils';
import { ButtonSearch, Input } from 'components/Searchbar';
import { useState } from 'react';

export function Searchbar(onSubmit, className, appQuery) {
  const [query, setQuery] = useState(localStorage.getItem('query') ?? '');

  // state = {
  //   query: localStorage.getItem('query') ?? '',
  // };
  const checkQuery = query => {
    if (isStringEmpty(query)) {
      toast.error('Please write a query first');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setQuery('');
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    if (!checkQuery(query)) return;

    if (appQuery === query) {
      toast.error('The same query! Try a different one, please!');
      return;
    }

    onSubmit(query);
    localStorage.setItem('query', '');
    resetForm();
  };

  const handleInputChange = evt => {
    const newQuery = evt.target.value;
    setQuery(newQuery);
    localStorage.setItem('query', newQuery);
  };

  return (
    <header className={className}>
      <form onSubmit={handleFormSubmit} className="searchbar__form">
        <ButtonSearch type="submit" className="searchbar__button">
          <MdOutlineImageSearch
            fill="#fff"
            width="20"
            height="20"
            className="searchbar__icon"
          />
          <span className="button-label">Search</span>
        </ButtonSearch>

        <Input
          onChange={handleInputChange}
          value={query}
          name="searchQuery"
          className="searchbar__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  appQuery: PropTypes.string.isRequired,
};
