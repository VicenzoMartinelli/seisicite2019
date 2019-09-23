import React from 'react';
import Routes from './configs/routes';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

const App = () => {
  return (
    <StyleProvider style={getTheme(material)}>
      <Routes />
    </StyleProvider>
  );
};
export default App;
