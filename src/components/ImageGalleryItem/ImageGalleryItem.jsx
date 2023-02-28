import ImageModal from 'components/ImageModal';
import PropTypes from 'prop-types';
import { Component } from 'react';
import defaultImg from '../../img/default-image.jpg';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      descr: PropTypes.string,
    }).isRequired,
    className: PropTypes.string.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
    document.querySelector('.searchbar').style.position = 'static';
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    document.querySelector('.searchbar').style.position = 'sticky';
  };

  render() {
    const { isModalOpen } = this.state;
    const { image, className } = this.props;
    const { webformatURL, largeImageURL, tags } = image;
    return (
      <li className={className}>
        <img
          src={webformatURL ?? defaultImg}
          alt={tags ?? 'no description provided'}
          className="imageGallery__image"
          onClick={this.openModal}
        />
        <ImageModal
          largeImageURL={largeImageURL}
          tags={tags}
          isModalOpen={isModalOpen}
          closeModal={this.closeModal}
          className="imageGallery__modal"
        />
      </li>
    );
  }
}
