import * as React from 'react';
import Main from './pages/Main';

require('./assets/scss/main.scss');

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.PureComponent {
  render() {
    return (
      <div id="main">
        <h1 id="header">Car Deprecation Calculator</h1>
        <Main formName="carDeprecation" />
      </div>
    );
  }
}
