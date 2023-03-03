import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'components/App/App.styled';

export function Section({ title, className = 'section', children }) {
  return (
    <section className={`section ${className}`}>
      <Container className="container">
        {title && (
          <h3 className={`${className}__title section-title`}>{title}</h3>
        )}
        {children}
      </Container>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
