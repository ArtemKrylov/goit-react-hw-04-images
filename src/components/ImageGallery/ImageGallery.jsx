import PropTypes from 'prop-types';
import Section from 'components/Section';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Spinner from 'components/Spinner/Spinner';
import IdleGallery from 'components/IdleGallery';
import { ImageGalleryRejected } from './ImageGallery.styled';
import { STATUS } from 'constants';

export default function ImageGallery({
  className,
  images,
  status,
  handleFigureClick,
  openModal,
}) {
  //gallery on first load
  if (status === STATUS.IDLE) {
    return (
      <Section className={className}>
        <IdleGallery
          className="idleGallery"
          handleFigureClick={handleFigureClick}
        />
      </Section>
    );
  }

  //gallery while making get request
  if (status === STATUS.PENDING) {
    return (
      <Section className={className}>
        <Spinner />
      </Section>
    );
  }

  //gallery after request resolved
  if (status === STATUS.RESOLVED) {
    if (images.length === 0) {
      return (
        <Section className={className}>
          <h3>No images found</h3>
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
                openModal={openModal}
              />
            ))}
          </ul>
        </Section>
      );
    }
  }

  //gallery if request rejected
  if (status === STATUS.REJECTED) {
    return (
      <Section className={className}>
        <ImageGalleryRejected className="imageGallery__rejected">
          There are no images by your query
        </ImageGalleryRejected>
      </Section>
    );
  }
}

ImageGallery.propTypes = {
  className: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  handleFigureClick: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
