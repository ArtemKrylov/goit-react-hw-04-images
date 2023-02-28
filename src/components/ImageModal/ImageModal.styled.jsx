import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import ImageModal from './ImageModal';

const ImageModalStyled = styled(ImageModal)`
  & .imageModal__image {
    object-fit: cover;
  }

  & .imageModal__close-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20px;
    right: 20px;

    width: 40px;
    height: 40px;
    transition: border ${({ theme }) => theme.cubic};

    background-color: transparent;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};

    &:hover,
    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.accent};
    }
  }
`;
export default ImageModalStyled;

export const CloseModalBtnIcon = styled(AiFillCloseCircle)`
  fill: ${({ theme }) => theme.colors.accent};
  display: block;
  width: 100%;
  height: 100%;

  & path {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
