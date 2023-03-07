import styled from 'styled-components';

export const NavbarStyled = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  font-weight: 700;

  & a {
    color: ${({ theme }) => theme.colors.black};

    &.active {
      color: ${({ theme }) => theme.colors.accent};
      text-shadow: ${({ theme }) => theme.shadows.fontBlack};
    }
  }

  ${({ theme }) => theme.media.tablet} {
    padding-left: 10px;
  }

  ${({ theme }) => theme.media.desktop} {
    padding-left: 25px;
    gap: 25px;
  }
`;
