import React from 'react';
import PropTypes from 'prop-types';
import FooterWrapper, {
  MenuWrapper,
  CopyrightArea,
  SecondaryFooter,
} from './Footer.style';

const Footer = ({ menu, copyright, className, path }) => {
  return (
    <>
      <FooterWrapper id="footer" className={className}>
        {menu && <MenuWrapper>{menu}</MenuWrapper>}
        {copyright && <CopyrightArea>{copyright}</CopyrightArea>}
      </FooterWrapper>
      {!!path && <SecondaryFooter />}
    </>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.element,
  menu: PropTypes.element,
  bgSrc: PropTypes.string,
  copyright: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Footer;
