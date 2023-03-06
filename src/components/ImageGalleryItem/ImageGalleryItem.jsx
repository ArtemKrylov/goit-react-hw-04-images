import PropTypes from 'prop-types';

import defaultImg from '../../img/default-image.jpg';
import { useUser } from 'utils/userContext';
import { AddToFirestoreIcon } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ image, className, openModal }) {
  const { webformatURL, tags } = image;
  const { isLoggedIn, addImgToFirestore } = useUser();
  return (
    <li className={className}>
      <img
        src={webformatURL ?? defaultImg}
        alt={tags ?? 'no description provided'}
        className="imageGallery__image"
        onClick={() => openModal(image)}
        loading="lazy"
      />
      {isLoggedIn && (
        <button
          type="button"
          className="imageGallery__firestoreBtn"
          onClick={() => addImgToFirestore(webformatURL)}
        >
          <AddToFirestoreIcon />
        </button>
      )}
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
