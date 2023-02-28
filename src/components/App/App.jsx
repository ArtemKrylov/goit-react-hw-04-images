import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from '../GlobalStyle';
import { SearchbarStyled } from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export default class App extends Component {
  state = {
    query: '',
  };

  componentDidUpdate(_, prevState) {
    const { query } = this.state;
    if (prevState.query === query) {
      toast.error('The same query! Try a different one, please!');
      return;
    }
  }

  onSearchFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <div className="app">
        <GlobalStyle />
        <SearchbarStyled
          onSubmit={this.onSearchFormSubmit}
          className="searchbar"
        />
        <ImageGallery query={query} className="imageGallery" />

        <ToastContainer theme="colored" autoClose={2000} />
      </div>
    );
  }
}
