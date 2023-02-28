import styled from 'styled-components';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGalleryItemStyled = styled(ImageGalleryItem)`
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
`;
export default ImageGalleryItemStyled;
