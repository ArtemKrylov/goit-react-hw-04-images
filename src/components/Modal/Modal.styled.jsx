import styled from 'styled-components';

export const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000e0;

  & .modal__window {
    position: relative;
    outline: none;
    max-height: 80%;
    max-width: 80%;
    overflow: hidden;
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }
`;
