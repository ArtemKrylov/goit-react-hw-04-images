import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { GlobalStyle } from '../GlobalStyle';
import { SearchbarStyled } from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import PixabayAPI from 'API/pixabayAPI';
import { scrollToTop } from 'utils';
import PaginationBar from 'components/PaginationBar';
import { STATUS } from 'constants';
import ImageModal from 'components/ImageModal';
import Authentication from 'components/Authentication';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';

const pixabayAPI = new PixabayAPI();

export default function App() {
  const imagesPerPage = 12;

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState(1); //total pages for key word
  const [pageSelected, setPageSelected] = useState(1);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [modalImg, setModalImg] = useState({});
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //adding to localstorage queriesList key which value is [{query: 'query'  , image: 'url'}, ...]
    //for previous searches
    function addQueryToLocalStorage(query, image) {
      let queriesList = localStorage.getItem('queriesList');
      queriesList = queriesList ? JSON.parse(queriesList) : [];
      //if in there is such query in localstorage - don`t add it
      if (queriesList.find(el => el.query === query)) return;
      queriesList.push({ query, image });
      localStorage.setItem('queriesList', JSON.stringify(queriesList));
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
        const fetchedPageCount = Math.ceil(
          response.data.totalHits / imagesPerPage
        );
        if (pageCount !== fetchedPageCount) {
          setPageCount(fetchedPageCount);
        }
        addQueryToLocalStorage(fetchQuery, response.data.hits[0].previewURL);
      } catch (error) {
        console.error(error);
        //request rejected - state changes to REJECTED => render rejected option
        setStatus(STATUS.REJECTED);
      }
    }

    if (query === '') return;
    fetchImages(query, pageSelected);
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, pageSelected]);

  function onSearchFormSubmit(newQuery) {
    setQuery(newQuery);
    navigate('/gallery');
  }

  //for pagination page change
  async function handlePageClick({ selected }) {
    const page = selected + 1;
    if (page === pageSelected) return;
    setPageSelected(page);
  }

  //for idle gallery previous searches
  function handleFigureClick(newQuery) {
    setQuery(newQuery);
    navigate('/gallery');
  }

  //for all modal windows - depending opened/closed - controls searchbar position and body styles
  function toggleModal() {
    if (isAuthOpen || Object.keys(modalImg).length > 0) {
      document.querySelector('.searchbar').style.position = 'sticky';
    } else {
      document.querySelector('.searchbar').style.position = 'static';
    }
    document.querySelector('body').classList.toggle('body--modal-open');
  }

  //for image modal window
  function openImgModal(newModalImg) {
    setModalImg(newModalImg);
    toggleModal();
  }

  function closeImgModal() {
    setModalImg({});
    toggleModal();
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

  //for auth modal window
  function openAuth() {
    toggleModal();
    setIsAuthOpen(true);
  }

  function closeAuth() {
    toggleModal();
    setIsAuthOpen(false);
  }

  //
  const isImgModalOpen = Object.keys(modalImg).length !== 0;

  return (
    <div className="app">
      <GlobalStyle />
      {/* Header */}
      {/* <SearchbarStyled
        onSubmit={onSearchFormSubmit}
        className="searchbar"
        appQuery={query}
        openAuth={openAuth}
        isLogged={isAuthOpen}
      /> */}
      {/* Navigation */}
      <Navbar />
      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <SearchbarStyled
              onSubmit={onSearchFormSubmit}
              className="searchbar"
              appQuery={query}
              openAuth={openAuth}
              isLogged={isAuthOpen}
            />
          }
        >
          <Route
            index
            element={
              <Home
                className="idleGallery"
                handleFigureClick={handleFigureClick}
              />
            }
          />
          <Route
            path="gallery"
            element={
              <div>
                <ImageGallery
                  className="imageGallery"
                  handleFigureClick={handleFigureClick}
                  images={images}
                  status={status}
                  openModal={openImgModal}
                  query={query}
                />
                {/* Pagination */}
                {pageCount > 1 && (
                  <PaginationBar
                    handlePageClick={handlePageClick}
                    pageCount={pageCount}
                    className="paginationBar"
                  />
                )}
              </div>
            }
          />
        </Route>
      </Routes>

      {/* <ImageGallery
        className="imageGallery"
        handleFigureClick={handleFigureClick}
        images={images}
        status={status}
        openModal={openImgModal}
      /> */}

      {/* Pagination */}
      {/* {pageCount > 1 && (
        <PaginationBar
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          className="paginationBar"
        />
      )} */}

      {/*Modals*/}
      {/*Image Modal*/}
      {isImgModalOpen && (
        <ImageModal
          largeImageURL={modalImg.largeImageURL}
          tags={modalImg.tags}
          isModalOpen={isImgModalOpen}
          closeModal={closeImgModal}
          className="imageGallery__modal"
          openNextImage={openNextImage}
          openPreviousImage={openPreviousImage}
        />
      )}
      {/*Auth Modal*/}
      {isAuthOpen && <Authentication className="auth" closeAuth={closeAuth} />}

      {/* For notifications using ReactToastify library */}
      <ToastContainer theme="colored" autoClose={2000} />
    </div>
  );
}
