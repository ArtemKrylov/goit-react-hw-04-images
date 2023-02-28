import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'components/Section';
import ImageGalleryItem from 'components/ImageGalleryItem';
import PixabayAPI from 'API/pixabayAPI';
import PaginationBar from 'components/PaginationBar';
import Spinner from 'components/Spinner/Spinner';
const pixabayAPI = new PixabayAPI();

export default class ImageGallery extends Component {
  //static obj for 'state machine'
  static STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  };
  static imagesPerPage = 12;

  static propTypes = {
    query: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  };

  //there is status property in state, which correspondes the request status
  state = {
    status: ImageGallery.STATUS.IDLE,
    images: [],
    pageCount: 1, //total pages for key word
    pageSelected: 1,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { query } = this.props;
    const { pageSelected } = this.state;

    if (prevProps.query !== query) {
      this.setState({ pageSelected: 1 });
    }
    //if changed query and page
    if (prevProps.query !== query || prevState.pageSelected !== pageSelected) {
      this.fetchImages(query, pageSelected);
    }
  };

  async fetchImages(query, pageSelected) {
    try {
      //while fetching
      this.setState({ status: ImageGallery.STATUS.PENDING });
      const response = await pixabayAPI.fetchImagesByKey(query, pageSelected);

      //request resolved
      this.setState({
        images: response.data.hits,
        status: ImageGallery.STATUS.RESOLVED,
        pageCount: Math.ceil(
          response.data.totalHits / ImageGallery.imagesPerPage
        ),
      });
    } catch (error) {
      console.error(error);
      //request rejected - state changes to REJECTED => render rejected option
      this.setState({ status: ImageGallery.STATUS.REJECTED });
    }
  }

  handlePageClick = async ({ selected }) => {
    const page = selected + 1;
    if (page === this.state.page) return;
    try {
      const response = await pixabayAPI.fetchImagesByKey(
        this.props.query,
        selected + 1
      );

      //request resolved
      this.setState({
        images: response.data.hits,
        status: ImageGallery.STATUS.RESOLVED,
      });
    } catch (error) {
      console.error(error);
      //request rejected - state changes to REJECTED => render rejected option
      this.setState({ status: ImageGallery.STATUS.REJECTED });
    }
  };

  render() {
    const { images, status, pageCount } = this.state;
    const { className } = this.props;

    //gallery on first load
    if (status === ImageGallery.STATUS.IDLE) {
      return (
        <Section className={className}>
          <ul className="imageGallery__list">Search something</ul>
        </Section>
      );
    }

    //gallery while making get request
    if (status === ImageGallery.STATUS.PENDING) {
      return (
        <Section className={className}>
          <Spinner />
        </Section>
      );
    }

    //gallery after request resolved
    if (status === ImageGallery.STATUS.RESOLVED) {
      if (images.length === 0) {
        return (
          <Section className={className}>
            <p>No images found</p>
          </Section>
        );
      } else {
        return (
          <Section className={className}>
            <ul className="imageGallery__list">
              {images.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  className="imageGallery__item"
                />
              ))}
            </ul>
            {/* Pagination */}
            {pageCount > 1 && (
              <PaginationBar
                handlePageClick={this.handlePageClick}
                pageCount={pageCount}
                className="paginationBar"
              />
            )}
          </Section>
        );
      }
    }

    //gallery if request rejected
    if (status === ImageGallery.STATUS.REJECTED) {
      return (
        <Section className={className}>
          <ul className="imageGallery__list">
            There are no images by your query
          </ul>
        </Section>
      );
    }
  }
}
