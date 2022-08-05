import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import footerBg from './footer-bg.svg';

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: var(--background);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;
  padding: 37px 0 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: row-reverse;
  align-items: flex-end;

  @media (max-width: 480px) {
    padding: 60px 0 50px;
  }
`;

export const MenuWrapper = styled.div`
  margin-top: 40px;
  padding-left: 10px;

  @media (max-width: 480px) {
    margin-top: 30px;
    padding-left: 0;
  }

  ul,
  .ant-menu,
  ul.ant-menu {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;

    @media (max-width: 480px) {
      flex-wrap: wrap;
    }

    li {
      margin: 0 15px;
      padding: 0;
      height: auto;
      margin-bottom: 0 !important;

      @media (max-width: 480px) {
        margin: 0 7px;
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.ant-menu-item-selected {
        background-color: transparent;
      }

      color: ${themeGet('text.0')};
      font-size: 13px;
      line-height: 18px;
      font-weight: 600;
      transition: color 0.2s ease-in-out;

      a {
        color: ${themeGet('text.0', '#2C2C2C')};
        transition: color 0.2s ease-in-out;
        &:hover {
          color: ${themeGet('primary.0', '#008489')};
        }
      }
    }
  }
`;

export const CopyrightArea = styled.div`
  color: ${themeGet('text.0', '#909090')};
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
  margin-top: 30px;
  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 20px;
  }
`;

export const SecondaryFooter = styled.div`
  @media (max-width: 1200px) {
    height: 74px;
  }
`;

export default FooterWrapper;
