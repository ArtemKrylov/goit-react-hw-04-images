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
      console.log('key', key);
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
    //keydown event listener
    document.querySelector('body').addEventListener('keydown', handleKeyDown);
    return () => {
      document
        .querySelector('body')
        .removeEventListener('keydown', handleKeyDown);
    };
  }, [openNextImage, openPreviousImage, closeModal]);

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
  openNextImage: PropTypes.func.isRequired,
  openPreviousImage: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
