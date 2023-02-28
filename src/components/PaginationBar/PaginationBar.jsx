import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

export default function PaginationBar({
  handlePageClick,
  pageCount,
  className,
}) {
  return (
    <ReactPaginate
      className={className}
      breakLabel="..."
      nextLabel="next >"
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
}

PaginationBar.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};
