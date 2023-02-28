import { ThreeCircles } from 'react-loader-spinner';

import React from 'react';
import SpinnerContainer from './SpinnerContainer.styled';

export default function Spinner() {
  const color = '#ff6a00';
  return (
    <SpinnerContainer>
      <ThreeCircles
        height="100"
        width="100"
        color={color}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </SpinnerContainer>
  );
}
