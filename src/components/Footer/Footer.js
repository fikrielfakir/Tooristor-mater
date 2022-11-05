import React from 'react';
import PropTypes from 'prop-types';
import FooterWrapper, {
  MenuWrapper,
  CopyrightArea,
  SecondaryFooter,
} from './Footer.style';
import { useTranslation } from 'react-i18next';

const Footer = ({ menu, copyright, className, path }) => {
const {t} = useTranslation()
const year = new Date().getFullYear()
  return (
    <>
      <FooterWrapper id="footer" className={className}>
        {menu && <MenuWrapper>{menu}</MenuWrapper>}
        {copyright && <CopyrightArea>{t("reserved_by")} | {year}</CopyrightArea>}
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
