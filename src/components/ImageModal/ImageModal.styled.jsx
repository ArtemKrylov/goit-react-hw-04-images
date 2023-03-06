import { AiFillCloseCircle } from 'react-icons/ai';
import { GrNext, GrPrevious } from 'react-icons/gr';
import styled from 'styled-components';
import ImageModal from './ImageModal';

const ImageModalStyled = styled(ImageModal)`
  & .imageModal__image {
    object-fit: cover;
    min-width: 300px;
    min-height: 300px;
    background: #06beb59d;
    background: linear-gradient(to right, #48b1bfb2, #06beb593);

    ${({ theme }) => theme.media.tablet} {
      min-width: 450px;
      min-height: 450px;
    }

    ${({ theme }) => theme.media.desktop} {
      min-width: 500px;
      min-height: 500px;
    }
  }

  & .imageModal__close-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 10px;
    right: 10px;

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

    ${({ theme }) => theme.media.desktop} {
      top: 20px;
      right: 20px;
    }
  }

  & .imageModal__nav-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translate(0, -50%);
    background-color: transparent;
    border: none;
    margin: 0;
  }

  & .imageModal__next-btn {
    right: 10px;
  }

  & .imageModal__prev-btn {
    left: 10px;
  }
`;
export default ImageModalStyled;

export const CloseModalBtnIcon = styled(AiFillCloseCircle)`
  fill: ${({ theme }) => theme.colors.accent};
  display: block;
  width: 100%;
  height: 100%;

  & path {
    fill: ${({ theme }) => theme.colors.accent};
    width: 100%;
    height: 100%;
  }
`;

export const NextModalBtnIcon = styled(GrNext)`
  & * {
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 4;
  }
`;

export const PrevModalBtnIcon = styled(GrPrevious)`
  & * {
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 4;
  }
`;
