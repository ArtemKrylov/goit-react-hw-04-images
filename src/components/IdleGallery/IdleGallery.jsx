import React from 'react';
import PropTypes from 'prop-types';

export default function IdleGallery({ className, handleFigureClick }) {
  const queriesList = localStorage.getItem('queriesList');
  const handleClick = evt => {
    handleFigureClick(evt.currentTarget.dataset.query);
  };
  return (
    <div className={className}>
      <h3 className="idleGallery__text">Search something</h3>
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
                    {el.query}
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
