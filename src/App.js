import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'themes/default.theme';
import "../src/Assets/Styles/fonts/stylesheet.css"
import cookies from 'js-cookie'
import "../src/Assets/Styles/icons/style.css"
import "./main.css"
import '../node_modules/rsuite/dist/rsuite.min.css';
import GlobalStyles from 'themes/global.style';
import AuthProvider from 'context/AuthProvider';
import Routes from './router';


import "../src/Assets/Styles/fonts/stylesheet.css"
import "../src/Assets/Styles/icons/style.css"
import "../src/Assets/Styles/FA5PRO-master/css/all.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css"
import "./responsive.css"
import "./Placeholder-loading.css"

function App() {
  const currentLanguageCode = cookies.get('i18next')
  console.log("currant",currentLanguageCode)
  if(currentLanguageCode == 'ar') {
    require('rtl.css');
  }
  
  if(currentLanguageCode == 'fr' || currentLanguageCode == 'en') {
    require('ltr.css');
  }
  
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
