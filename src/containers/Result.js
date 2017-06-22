import React from 'react';
import { Home } from 'containers';

class Result extends React.Component {
  render() {
    return (
      <Home era={this.props.params.era}/>
    );
  }
}

export default Result;
