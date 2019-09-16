import React from "react";
import GlobalStyle from "./styles/global";
import { ToastProvider } from 'react-toast-notifications';
import ToastContainer from './components/Toast/ToastContainer';
import ToastTop from './components/Toast/ToastTop';
import Routes from "./routes";
import { MuiThemeProvider } from "@material-ui/core";
import theme from './styles/theme';


const App = () => (
  <MuiThemeProvider theme={theme}>
    <ToastProvider placement={'bottom-right'} components={{ ToastContainer: ToastContainer, Toast: ToastTop }}>
      <Routes />
      <GlobalStyle />
    </ToastProvider >
  </MuiThemeProvider>
);

export default App;
