import React from "react";
import { Grommet } from "grommet";
import { aruba } from "grommet-theme-aruba";
import GlobalStyle from "./styles/global";
import Routes from "./routes";
import merge from 'deepmerge';
import Theme from './styles/theme';

const theme = merge(aruba, Theme);

const App = () => (
  <Grommet theme={theme} full={true}>
    <Routes />
    <GlobalStyle />
  </Grommet>
);

export default App;
