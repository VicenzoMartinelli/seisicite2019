import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

  body {
    font: 14px 'Roboto', sans-serif;
    background: rgba(211, 211, 211, 0.62);
    -webkit-font-smoothing: antialiased !important;
  }

  * {
    max-height: 100%;
  }

  /* h1, h2, h3, h4, h5 {
    background: -webkit-linear-gradient(#c02425, #f0cb35);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  } */
`
