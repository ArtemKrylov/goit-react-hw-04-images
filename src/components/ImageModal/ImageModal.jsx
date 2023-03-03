// import Modal from 'react-modal';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import defaultImage from '../../img/default-image.jpg';
import {
  CloseModalBtnIcon,
  NextModalBtnIcon,
  PrevModalBtnIcon,
} from './ImageModal.styled';

export default function ImageModal({
  largeImageURL,
  tags,
  closeModal,
  className,
  openNextImage,
  openPreviousImage,
}) {
  return (
    <Modal
      className={className}
      contentLabel="Image Modal"
      openNextImage={openNextImage}
      openPreviousImage={openPreviousImage}
      closeModal={closeModal}
    >
      <img
        src={largeImageURL ?? defaultImage}
        alt={tags ?? 'no data provided'}
        className="imageModal__image"
      />
      <button
        type="button"
        onClick={openNextImage}
        className="imageModal__nav-btn imageModal__prev-btn"
      >
        <PrevModalBtnIcon />
      </button>
      <button
        type="button"
        onClick={openPreviousImage}
        className="imageModal__nav-btn imageModal__next-btn"
      >
        <NextModalBtnIcon />
      </button>
      <button
        type="button"
        onClick={closeModal}
        className="imageModal__close-btn"
      >
        <CloseModalBtnIcon width="40" height="40" />
      </button>
    </Modal>
  );
}

ImageModal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  openPreviousImage: PropTypes.func.isRequired,
  openNextImage: PropTypes.func.isRequired,
};
