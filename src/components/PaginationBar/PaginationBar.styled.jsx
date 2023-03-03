import styled from 'styled-components';
import PaginationBar from './PaginationBar';

const PaginationBarStyled = styled(PaginationBar)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px 0;

  & li {
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
    transition: border ${({ theme }) => theme.cubic},
      text-shadow ${({ theme }) => theme.cubic},
      color ${({ theme }) => theme.cubic},
      background-color ${({ theme }) => theme.cubic};
    cursor: pointer;

    &.selected {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.accent};
    }

    &.disabled {
      ${({ theme }) => theme.visuallyHidden};
    }

    &:hover,
    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.white};
      text-shadow: ${({ theme }) => theme.shadows.fontBlack};
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  & li a {
    display: block;
    padding: 10px;
  }
`;
export default PaginationBarStyled;
