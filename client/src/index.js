import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

class Hello extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('body')
);

