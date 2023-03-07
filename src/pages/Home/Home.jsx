import IdleGallery from 'components/IdleGallery';
import PropTypes from 'prop-types';

export default function Home({ className, handleFigureClick }) {
  return (
    <IdleGallery className={className} handleFigureClick={handleFigureClick} />
  );
}

Home.propTypes = {
  className: PropTypes.string.isRequired,
  handleFigureClick: PropTypes.func.isRequired,
};
