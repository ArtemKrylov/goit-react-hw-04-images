import PropTypes from 'prop-types';
import defaultImg from '../../img/default-image.jpg';

export default function ImageGalleryItem({ image, className, openModal }) {
  const { webformatURL, tags } = image;
  return (
    <li className={className}>
      <img
        src={webformatURL ?? defaultImg}
        alt={tags ?? 'no description provided'}
        className="imageGallery__image"
        onClick={() => openModal(image)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    descr: PropTypes.string,
  }).isRequired,
  className: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
