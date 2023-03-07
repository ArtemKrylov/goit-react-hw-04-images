import styled from 'styled-components';
import ImageGallery from './ImageGallery';

const ImageGalleryStyled = styled(ImageGallery)`
  & .noQuery {
    text-align: center;
  }

  & .imageGallery__query {
    margin-bottom: 15px;
    text-align: center;
    font-weight: 700;

    & span {
      font-style: italic;
      font-weight: 500;
    }
  }

  & .imageGallery__list {
    display: grid;
    max-width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: 16px;
    margin: 0;
    padding: 0;
  }
`;
export default ImageGalleryStyled;

export const ImageGalleryRejected = styled.div`
  text-align: center;
  font-weight: 700;
  text-shadow: ${({ theme }) => theme.shadows.fontBlack};
  color: ${({ theme }) => theme.colors.accent};
`;
