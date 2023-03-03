import React, { useEffect, useState } from 'react';
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

export default function App() {
  const pixabayAPI = new PixabayAPI();
  const imagesPerPage = 12;

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(1); //total pages for key word
  const [pageSelected, setPageSelected] = useState(1);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [modalImg, setModalImg] = useState({});

  useEffect(() => {
    fetchImages(query, pageSelected);
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, pageSelected]);

  //for pagination - if new query - show first page
  useEffect(() => {
    setPageSelected(1);
  }, [query]);

  function onSearchFormSubmit(newQuery) {
    setQuery(newQuery);
  }

  async function fetchImages(fetchQuery, selectedPage) {
    try {
      //while fetching
      setStatus(STATUS.PENDING);
      const response = await pixabayAPI.fetchImagesByKey(
        fetchQuery,
        selectedPage
      );

      //request resolved
      setImages(response.data.hits);
      setStatus(STATUS.RESOLVED);
      setPageCount(Math.ceil(response.data.totalHits / imagesPerPage));
      addQueryToLocalStorage(fetchQuery, response.data.hits[0].previewURL);
    } catch (error) {
      console.error(error);
      //request rejected - state changes to REJECTED => render rejected option
      setStatus(STATUS.REJECTED);
    }
  }

  //adding to localstorage queriesList key which value is [{query: 'query'  , image: 'url'}, ...]
  function addQueryToLocalStorage(query, image) {
    let queriesList = localStorage.getItem('queriesList');
    queriesList = queriesList ? JSON.parse(queriesList) : [];
    //if in there is such query in localstorage - don`t add it
    if (queriesList.find(el => el.query === query)) return;
    queriesList.push({ query, image });
    localStorage.setItem('queriesList', JSON.stringify(queriesList));
  }

  //for pagination page change
  async function handlePageClick({ selected }) {
    const page = selected + 1;
    if (page === pageSelected) return;
    try {
      const response = await pixabayAPI.fetchImagesByKey(query, selected + 1);

      //request resolved
      setImages(response.data.hits);
      setStatus(STATUS.RESOLVED);
      scrollToTop();
    } catch (error) {
      console.error(error);
      //request rejected - state changes to REJECTED => render rejected option
      setStatus(STATUS.REJECTED);
    }
  }

  //for idle gallery previous searches
  function handleFigureClick(newQuery) {
    setQuery(newQuery);
    fetchImages(query, 1);
  }

  //for modal window
  function openModal(newModalImg) {
    setTimeout(() => {
      setModalImg(newModalImg);
      document.querySelector('.searchbar').style.position = 'static';
      document.querySelector('body').classList.add('body--modal-open');
    }, theme.modalTimeOut);
  }

  function closeModal() {
    setTimeout(() => {
      setModalImg({});
      document.querySelector('.searchbar').style.position = 'sticky';
      document.querySelector('body').classList.remove('body--modal-open');
    }, theme.modalTimeOut);
  }

  //for modal window to open previous image
  function openPreviousImage() {
    const prevImage =
      images[images.indexOf(modalImg) - 1] ?? images[images.length - 1];
    setModalImg(prevImage);
  }

  //for modal window to open next image
  function openNextImage() {
    const nextImage = images[images.indexOf(modalImg) + 1] ?? images[0];
    setModalImg(nextImage);
  }

  const isModalOpen = Object.keys(modalImg).length !== 0;

  return (
    <div className="app">
      <GlobalStyle />
      <SearchbarStyled
        onSubmit={onSearchFormSubmit}
        className="searchbar"
        appQuery={query}
      />
      <ImageGallery
        className="imageGallery"
        handleFigureClick={handleFigureClick}
        images={images}
        status={status}
        openModal={openModal}
      />

      {/* Pagination */}
      {pageCount > 1 && status === STATUS.RESOLVED && (
        <PaginationBar
          handlePageClick={handlePageClick}
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
          closeModal={closeModal}
          className="imageGallery__modal"
          openNextImage={openNextImage}
          openPreviousImage={openPreviousImage}
        />
      )}

      {/* For notifications using ReactToastify library */}
      <ToastContainer theme="colored" autoClose={2000} />
    </div>
  );
}
