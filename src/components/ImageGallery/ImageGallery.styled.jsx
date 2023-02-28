import styled from 'styled-components';
import ImageGallery from './ImageGallery';

const ImageGalleryStyled = styled(ImageGallery)`
  & .imageGallery__list {
    display: grid;
    max-width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 16px;
    margin: 0;
    padding: 0 10px;

    ${props => props.theme.media.tablet} {
      padding: 0;
    }
  }
`;
export default ImageGalleryStyled;

export const ImageGalleryRejected = styled.div`
  text-align: center;
  font-weight: 700;
  text-shadow: ${({ theme }) => theme.shadows.fontBlack};
  color: ${({ theme }) => theme.colors.accent};
`;
