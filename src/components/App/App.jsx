import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from '../GlobalStyle';
import { SearchbarStyled } from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import PixabayAPI from 'API/pixabayAPI';
import { scrollToTop } from 'utils';
import PaginationBar from 'components/PaginationBar';
import { STATUS } from 'constants';

const pixabayAPI = new PixabayAPI();

export default class App extends Component {
  static imagesPerPage = 12;
  //static obj for 'state machine'
  // static STATUS = {
  //   IDLE: 'idle',
  //   PENDING: 'pending',
  //   RESOLVED: 'resolved',
  //   REJECTED: 'rejected',
  // };

  state = {
    query: '',
    images: [],
    pageCount: 1, //total pages for key word
    pageSelected: 1,
    status: STATUS.IDLE,
  };

  componentDidUpdate(_, prevState) {
    const { query, pageSelected } = this.state;
    // console.log('pr q: ', prevState.query, 'q: ', query);
    // if (prevState.query === query && prevState.pageSelected === pageSelected) {
    //   console.log('app same query');
    //   console.log('pr q: ', prevState.query, 'q: ', query);
    //   toast.error('The same query! Try a different one, please!');
    //   return;
    // }
    //if changed query
    if (prevState.query !== query) {
      this.setState({ pageSelected: 1 });
      this.fetchImages(query, pageSelected);
      scrollToTop();
    }
    //if changed page
    if (prevState.pageSelected !== pageSelected) {
      this.fetchImages(query, pageSelected);
      scrollToTop();
    }
  }

  onSearchFormSubmit = query => {
    this.setState({ query });
  };

  async fetchImages(query, pageSelected) {
    try {
      //while fetching
      this.setState({ status: STATUS.PENDING });
      const response = await pixabayAPI.fetchImagesByKey(query, pageSelected);

      //request resolved
      this.setState({
        images: response.data.hits,
        status: STATUS.RESOLVED,
        pageCount: Math.ceil(response.data.totalHits / App.imagesPerPage),
      });
      this.addQueryToLocalStorage(query, response.data.hits[0].previewURL);
    } catch (error) {
      console.error(error);
      //request rejected - state changes to REJECTED => render rejected option
      this.setState({ status: STATUS.REJECTED });
    }
  }

  //adding to localstorage queriesList key which value is [{query: 'query'  , image: 'url'}, ...]
  addQueryToLocalStorage(query, image) {
    let queriesList = localStorage.getItem('queriesList');
    queriesList = queriesList ? JSON.parse(queriesList) : [];
    //if in there is such query in localstorage - don`t add it
    if (queriesList.find(el => el.query === query)) return;
    queriesList.push({ query, image });
    localStorage.setItem('queriesList', JSON.stringify(queriesList));
  }

  handlePageClick = async ({ selected }) => {
    const { query } = this.state;
    console.log('pagination query: ', query);
    const page = selected + 1;
    if (page === this.state.page) return;
    try {
      const response = await pixabayAPI.fetchImagesByKey(query, selected + 1);

      //request resolved
      this.setState({
        images: response.data.hits,
        status: STATUS.RESOLVED,
      });
      scrollToTop();
    } catch (error) {
      console.error(error);
      //request rejected - state changes to REJECTED => render rejected option
      this.setState({ status: STATUS.REJECTED });
    }
  };

  handleFigureClick = query => {
    this.setState({ query });
    this.fetchImages(query, 1);
  };

  render() {
    const { pageCount, images, status, query } = this.state;
    return (
      <div className="app">
        <GlobalStyle />
        <SearchbarStyled
          onSubmit={this.onSearchFormSubmit}
          className="searchbar"
          appQuery={query}
        />
        <ImageGallery
          // query={query}
          className="imageGallery"
          handleFigureClick={this.handleFigureClick}
          images={images}
          status={status}
        />

        {/* Pagination */}
        {pageCount > 1 && status === STATUS.RESOLVED && (
          <PaginationBar
            handlePageClick={this.handlePageClick}
            pageCount={pageCount}
            className="paginationBar"
          />
        )}

        <ToastContainer theme="colored" autoClose={2000} />
      </div>
    );
  }
}
