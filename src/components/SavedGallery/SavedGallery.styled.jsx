import styled from 'styled-components';

export const SavedGalleryStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  margin-bottom: 20px;

  & .saved__gallery {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
  }

  & .saved__heading {
    margin-bottom: 10px;
    font-weight: 700;
  }

  & .saved__noFavouritesText {
    margin-bottom: 15px;
  }

  & .saved__image {
    width: 100px;
    height: auto;
  }
`;
