import React from 'react';
import PropTypes from 'prop-types';

import { SavedGalleryStyled } from './SavedGallery.styled';

export default function SavedGallery({ images }) {
  return (
    <SavedGalleryStyled>
      <h3 className="saved__heading">Your saved favourites</h3>
      {images.length === 0 ? (
        <p className="saved__noFavouritesText">
          Your have no saved favourites yet
        </p>
      ) : (
        <div className="saved__gallery">
          {images.map(image => (
            <img src={image} alt="saved" key={image} className="saved__image" />
          ))}
        </div>
      )}
    </SavedGalleryStyled>
  );
}

SavedGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
