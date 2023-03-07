import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarStyled } from './Navbar.styled';

export default function Navbar() {
  return (
    <NavbarStyled>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/gallery">Gallery</NavLink>
    </NavbarStyled>
  );
}
