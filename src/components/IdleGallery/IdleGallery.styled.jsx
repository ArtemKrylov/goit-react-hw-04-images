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
  }
  & .idleGallery__queries-list {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  & .idleGallery__figure {
    padding-bottom: 10px;
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
  }

  & .idleGallery__image {
    display: block;
    margin: 0;
    width: 80px;
    height: 50px;
  }
`;
export default IdleGalleryStyled;
