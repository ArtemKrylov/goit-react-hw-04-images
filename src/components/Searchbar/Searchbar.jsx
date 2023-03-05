import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdOutlineImageSearch } from 'react-icons/md';

import { isStringEmpty } from 'utils';
import {
  Auth,
  ButtonSearch,
  Input,
  LogInIcon,
  LogOutIcon,
} from 'components/Searchbar';
import { useState } from 'react';

import { useUser } from 'utils/userContext';

export function Searchbar({
  onSubmit,
  className,
  appQuery,
  isLogged,
  openAuth,
}) {
  const [query, setQuery] = useState(localStorage.getItem('query') ?? '');
  const { isLoggedIn, userName, logOut } = useUser();

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
        <div className="searchbar__inputContainer">
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
        </div>

        {isLoggedIn ? (
          <Auth>
            <p className="searchbar__userName">Hello, {userName} !</p>
            <LogOutIcon onClick={logOut} />
          </Auth>
        ) : (
          <Auth onClick={openAuth}>
            <LogInIcon />
          </Auth>
        )}
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  appQuery: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  openAuth: PropTypes.func.isRequired,
};
