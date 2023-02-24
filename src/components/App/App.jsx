import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GlobalStyle } from '../GlobalStyle';

export default class App extends Component {
  static defaultProps = {};
  state = {};
  render() {
    return (
      <div className="app">
        <GlobalStyle />
      </div>
    );
  }
}
