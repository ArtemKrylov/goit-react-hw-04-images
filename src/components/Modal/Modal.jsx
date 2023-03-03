import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(
  children,
  className,
  contentLabel,
  openNextImage,
  openPreviousImage,
  closeModal
) {
  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === 'Escape') {
        closeModal();
      }
      if (key === 'ArrowLeft') {
        openPreviousImage();
      }
      if (key === 'ArrowRight') {
        openNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return window.removeEventListener('keydown', handleKeyDown);
  }, [openNextImage, openPreviousImage, closeModal]);

  return createPortal(
    <ModalStyled
      className={`modal__overlay ${className}`}
      contentLabel={contentLabel}
    >
      <div className="modal__window">{children}</div>
    </ModalStyled>,
    modalRoot
  );
}
Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  contentLabel: PropTypes.string,
  openNextImage: PropTypes.func.isRequired,
  openPreviousImage: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
