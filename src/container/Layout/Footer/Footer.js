import React from 'react';
import Logo from 'components/UI/Logo/Logo';
import Footers from 'components/Footer/Footer';
import FooterMenu from './FooterMenu';

const Footer = () => {
  return (
    <Footers
      menu={<FooterMenu />}
      copyright={`All rights reserved by TOORISTOR | ${new Date().getFullYear()}@`}
    />
  );
};

export default Footer;
