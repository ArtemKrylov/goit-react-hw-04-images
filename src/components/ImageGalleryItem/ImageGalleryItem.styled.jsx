import styled from 'styled-components';
import { AiTwotoneStar } from 'react-icons/ai';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGalleryItemStyled = styled(ImageGalleryItem)`
  position: relative;
  max-width: 100%;
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  & .imageGallery__image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.cubic},
      box-shadow ${({ theme }) => theme.cubic},
      border ${({ theme }) => theme.cubic};

    &:hover,
    &:focus {
      :hover {
        transform: scale(1.03);
        cursor: zoom-in;
        border: 2px solid ${({ theme }) => theme.colors.accent};
        box-shadow: ${({ theme }) => theme.shadows.boxAccent};
      }
    }

    ${props => props.theme.media.tablet} {
      height: 200px;
    }

    ${props => props.theme.media.desktop} {
      height: 200px;
    }
  }

  & .imageGallery__firestoreBtn {
    padding: 0;
    width: 21px;
    height: 21px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;
export default ImageGalleryItemStyled;

export const AddToFirestoreIcon = styled(AiTwotoneStar)`
  fill: ${({ theme }) => theme.colors.accent};
`;
