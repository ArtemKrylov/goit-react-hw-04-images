import styled from 'styled-components';
import { Searchbar } from './Searchbar';
import { AiOutlineLogin } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';

export const SearchbarStyled = styled(Searchbar)`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  & .searchbar__form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 15px;

    width: 100%;
    ${({ theme }) => theme.media.tablet} {
      width: 75%;
      flex-direction: row;
    }
    ${({ theme }) => theme.media.desktop} {
      width: 50%;
    }
  }

  & .searchbar__inputContainer {
    position: relative;
  }
`;
// export default SearchbarStyled;

export const ButtonSearch = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 0;
  background-color: transparent;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
  }

  & .button-label {
    position: absolute;
    width: 0px;
    height: 0px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);
    border: 0;
  }
`;

export const Input = styled.input`
  padding: 10px;
  padding-left: 40px;
  width: 100%;

  border-radius: ${({ theme }) => theme.borderRadius};

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent};
  font-size: 20px;

  transition: box-shadow ${({ theme }) => theme.cubic};
  cursor: pointer;

  &::placeholder {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.boxDarkHover};
  }

  ${({ theme }) => theme.media.tablet} {
    width: 600px;
  }
`;

export const LogInIcon = styled(AiOutlineLogin)`
  cursor: pointer;

  & * {
    fill: ${({ theme }) => theme.colors.accent};
  }
`;

export const LogOutIcon = styled(AiOutlineLogout)`
  cursor: pointer;

  & * {
    fill: ${({ theme }) => theme.colors.accent};
  }
`;

export const Auth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 15px;
  margin-left: 5px;

  & .searchbar__userName {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 700;
    font-size: 10;
    text-align: center;
    overflow: hidden;

    ${({ theme }) => theme.media.tablet} {
      max-width: 100px;
    }
  }

  ${({ theme }) => theme.media.tablet} {
    margin-left: 15px;
    gap: 10px;
    flex-direction: row;
  }
`;
