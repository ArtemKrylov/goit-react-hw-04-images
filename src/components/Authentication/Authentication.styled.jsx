import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import Authentification from './Authentication';

export const CloseAuth = styled(AiFillCloseCircle)`
  & * {
    fill: ${({ theme }) => theme.colors.accent};
  }
`;

const AuthentificationStyled = styled(Authentification)`
  & .modal__window {
    position: relative;
    padding: 15px;
    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.media.tablet} {
      width: 600px;
      min-height: 400px;
      padding: 25px;
    }
    ${({ theme }) => theme.media.desktop} {
      padding: 45px;
      min-height: 550px;
    }
  }

  & .auth__heading {
    margin-bottom: 10px;

    text-align: center;

    ${({ theme }) => theme.media.tablet} {
      margin-bottom: 15px;
    }
    ${({ theme }) => theme.media.desktop} {
      margin-bottom: 35px;
    }
  }

  & .auth__label-text {
    margin-bottom: 5px;
  }

  & .auth__input {
    margin-bottom: 15px;
    border: 1px solid ${({ theme }) => theme.colors.white};
    transition: box-shadow ${({ theme }) => theme.cubic};

    &:hover,
    &:focus {
      outline: none;
      box-shadow: ${({ theme }) => theme.shadows.boxAccent};
    }

    ${({ theme }) => theme.media.tablet} {
      margin-bottom: 25px;
    }
    ${({ theme }) => theme.media.desktop} {
      margin-bottom: 45px;
    }
  }

  & .auth__submit-btn {
    margin: 10px auto 0;

    /* ${({ theme }) => theme.media.desktop} {
      margin-top: 35px;
      padding: 20px 35px;
    } */
  }

  & .auth__close-btn {
    position: absolute;
    padding: 0;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    background-color: transparent;
    border: none;
  }

  & .auth__or {
    text-align: center;
    margin: 5px 0;
  }
`;

export default AuthentificationStyled;
