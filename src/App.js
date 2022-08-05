import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'themes/default.theme';
import "../src/Assets/Styles/fonts/stylesheet.css"
import "../src/Assets/Styles/icons/style.css"
import "./main.css"
import GlobalStyles from 'themes/global.style';
import AuthProvider from 'context/AuthProvider';
import Routes from './router';
import "../src/Assets/Styles/fonts/stylesheet.css"
import "../src/Assets/Styles/icons/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css"

function App() {
    return (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </>
  </ThemeProvider>
  );
}

export default App;
