import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from 'utils/userContext';
import SavedGallery from 'components/SavedGallery';

export default function IdleGallery({ className, handleFigureClick }) {
  const [savedImages, setSavedImages] = useState([]);

  const queriesList = localStorage.getItem('queriesList');
  const handleClick = evt => {
    handleFigureClick(evt.currentTarget.dataset.query);
  };
  const { isLoggedIn, getSavedImgFromFirestore } = useUser();

  if (isLoggedIn) {
    async function getSavedImages() {
      const saved = await getSavedImgFromFirestore();
      setSavedImages(saved);
    }
    getSavedImages();
  }

  return (
    <div className={className}>
      {/* <h3 className="idleGallery__text">Search something</h3> */}

      {isLoggedIn && <SavedGallery className="saved" images={savedImages} />}

      {queriesList && (
        <div className="idleGallery__queries">
          <h3 className="idleGallery__queries-title">Previous searches:</h3>
          <ul className="idleGallery__queries-list">
            {[...new Set(JSON.parse(queriesList))].map((el, index) => (
              <li key={index}>
                <figure
                  data-query={el.query}
                  className="idleGallery__figure"
                  onClick={handleClick}
                >
                  <img
                    src={el.image}
                    className="idleGallery__image"
                    alt={el.query}
                  />
                  <figcaption className="idleGallery__figcaption">
                    {el.query.toLowerCase()}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

IdleGallery.propTypes = {
  className: PropTypes.string.isRequired,
  handleFigureClick: PropTypes.func.isRequired,
};
