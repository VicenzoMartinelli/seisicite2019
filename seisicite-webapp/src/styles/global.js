import { createGlobalStyle } from 'styled-components'
import { primaryColor } from './kit';

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

  body {
    font: 14px 'Roboto', sans-serif;
    background: rgb(239, 239, 239);
    -webkit-font-smoothing: antialiased !important;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
