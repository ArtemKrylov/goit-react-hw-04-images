import styled from 'styled-components';
import IdleGallery from './IdleGallery';

const IdleGalleryStyled = styled(IdleGallery)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  & .idleGallery__text {
    margin-bottom: 25px;
  }

  & .idleGallery__queries-title {
    margin-bottom: 10px;
  }
  & .idleGallery__queries-list {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  & .idleGallery__figure {
    width: 120px;
    margin: 0;
    border: 1px solid ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
    cursor: pointer;
    transition: transform ${({ theme }) => theme.cubic},
      box-shadow ${({ theme }) => theme.cubic};

    &:hover,
    &:focus {
      transform: translate(1px, 1px);
      box-shadow: ${({ theme }) => theme.shadows.boxAccent};
    }

    ${({ theme }) => theme.media.tablet} {
      width: 100px;
    }
  }

  & .idleGallery__figcaption {
    padding: 10px;
    font-size: 14px;
    text-align: center;
  }

  & .idleGallery__image {
    display: block;
    margin: 0;
    width: 100%;
    height: 70px;
  }
`;
export default IdleGalleryStyled;
