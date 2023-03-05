import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({
  children,
  className,
  contentLabel,
  openNextImage,
  openPreviousImage,
  closeModal,
}) {
  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (key === 'Escape') {
        closeModal();
      }
      if (className.includes('imageGallery__modal')) {
        if (key === 'ArrowLeft') {
          openPreviousImage();
        }
        if (key === 'ArrowRight') {
          openNextImage();
        }
      }
    };
    //keydown event listener
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openNextImage, openPreviousImage, closeModal, className]);

  function onOverlayClick(evt) {
    if (![...evt.target.classList].includes('modal__overlay')) return;
    closeModal();
  }

  return createPortal(
    <ModalStyled
      className={`modal__overlay ${className}`}
      contentLabel={contentLabel}
      onClick={onOverlayClick}
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
  openNextImage: PropTypes.func,
  openPreviousImage: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
};
