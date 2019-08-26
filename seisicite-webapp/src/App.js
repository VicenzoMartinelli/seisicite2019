import React from "react";
import GlobalStyle from "./styles/global";
import { ToastProvider } from 'react-toast-notifications';
import ToastContainer from './components/Toast/ToastContainer';
import Routes from "./routes";
import { ThemeProvider } from 'styled-components'

const theme = {
  palette: {
    primary: '##ff928b',
  },
};

const App = () => (
  <ThemeProvider theme={theme}>
    <ToastProvider placement={'bottom-right'} components={{ ToastContainer: ToastContainer }}>
      <Routes />
      <GlobalStyle />
    </ToastProvider >
  </ThemeProvider>
);

export default App;
