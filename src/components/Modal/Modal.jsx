import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    contentLabel: PropTypes.string,
    openNextImage: PropTypes.func.isRequired,
    openPreviousImage: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  handleKeyDown = ({ key }) => {
    const { closeModal, openNextImage, openPreviousImage } = this.props;
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

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { children, className, contentLabel } = this.props;
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
}
