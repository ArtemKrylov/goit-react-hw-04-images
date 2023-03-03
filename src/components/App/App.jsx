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
import ImageModal from 'components/ImageModal';
import { theme } from 'constants';

const pixabayAPI = new PixabayAPI();

export default class App extends Component {
  static imagesPerPage = 12;

  state = {
    query: '',
    images: [],
    pageCount: 1, //total pages for key word
    pageSelected: 1,
    status: STATUS.IDLE,
    modalImg: {},
  };

  componentDidUpdate(_, prevState) {
    const { query, pageSelected } = this.state;

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

  //for pagination page change
  handlePageClick = async ({ selected }) => {
    const { query } = this.state;
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

  //for idle gallery previous searches
  handleFigureClick = query => {
    this.setState({ query });
    this.fetchImages(query, 1);
  };

  //for modal window
  openModal = modalImg => {
    setTimeout(() => {
      this.setState({ modalImg });
      document.querySelector('.searchbar').style.position = 'static';
      document.querySelector('body').classList.add('body--modal-open');
    }, theme.modalTimeOut);
  };

  closeModal = () => {
    setTimeout(() => {
      this.setState({ modalImg: {} });
      document.querySelector('.searchbar').style.position = 'sticky';
      document.querySelector('body').classList.remove('body--modal-open');
    }, theme.modalTimeOut);
  };

  //for modal window to open previous image
  openPreviousImage = () => {
    const { images, modalImg } = this.state;
    const prevImage =
      images[images.indexOf(modalImg) - 1] ?? images[images.length - 1];
    this.setState({ modalImg: prevImage });
  };

  //for modal window to open next image
  openNextImage = () => {
    const { images, modalImg } = this.state;
    const nextImage = images[images.indexOf(modalImg) + 1] ?? images[0];
    this.setState({ modalImg: nextImage });
  };

  render() {
    const { pageCount, images, status, query, modalImg } = this.state;
    const isModalOpen = Object.keys(modalImg).length !== 0;

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
          openModal={this.openModal}
        />

        {/* Pagination */}
        {pageCount > 1 && status === STATUS.RESOLVED && (
          <PaginationBar
            handlePageClick={this.handlePageClick}
            pageCount={pageCount}
            className="paginationBar"
          />
        )}
        {/*Modal*/}
        {isModalOpen && (
          <ImageModal
            largeImageURL={modalImg.largeImageURL}
            tags={modalImg.tags}
            isModalOpen={isModalOpen}
            closeModal={this.closeModal}
            className="imageGallery__modal"
            openNextImage={this.openNextImage}
            openPreviousImage={this.openPreviousImage}
          />
        )}

        {/* For notifications using ReactToastify library */}
        <ToastContainer theme="colored" autoClose={2000} />
      </div>
    );
  }
}
