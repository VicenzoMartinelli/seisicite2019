import React from 'react';
import Routes from './configs/routes';
import { StyleProvider, Root } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

const App = () => {
  return (
    <StyleProvider style={getTheme(material)}>
      <Root>
        <Routes />
      </Root>
    </StyleProvider>
  );
};
export default App;
