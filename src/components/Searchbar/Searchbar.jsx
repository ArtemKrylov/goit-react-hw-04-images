import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdOutlineImageSearch } from 'react-icons/md';

import { isStringEmpty } from 'utils';
import { ButtonSearch, Input } from 'components/Searchbar';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
  };

  state = {
    query: localStorage.getItem('query') ?? '',
  };

  handleFormSubmit = evt => {
    const { onSubmit } = this.props;
    const { query } = this.state;
    evt.preventDefault();
    if (!this.checkQuery(query)) return;
    onSubmit(query);
    localStorage.setItem('query', '');
    this.resetForm();
  };

  handleInputChange = evt => {
    const query = evt.target.value;
    this.setState({ query });
    localStorage.setItem('query', query);
  };

  resetForm() {
    this.setState({ query: '' });
  }

  checkQuery(query) {
    if (isStringEmpty(query)) {
      toast.error('Please write a query first');
      return false;
    }
    return true;
  }

  render() {
    const { query } = this.state;
    return (
      <header className={this.props.className}>
        <form onSubmit={this.handleFormSubmit} className="searchbar__form">
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
            onChange={this.handleInputChange}
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
}
