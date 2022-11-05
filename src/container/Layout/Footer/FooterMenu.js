import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import {

  HOME_PAGE,
  ABOUT_US,
  PRIVACY_PAGE,
  AGENT_PROFILE_CONTACT,
} from 'settings/constantClient';

const FooterMenu = () => {
  const {t} = useTranslation()
  return (
    <Menu>
      {/* <Menu.Item key="0">
        <NavLink to={`${HOME_PAGE}`}>Home</NavLink>
      </Menu.Item> */}
      <Menu.Item key="1">
        <NavLink to={`${ABOUT_US }`}>{t("About_us")}</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={`${AGENT_PROFILE_CONTACT}`}>{t("Contact_us")}</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${PRIVACY_PAGE}`}>{t("Privacy_Policy")}</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${PRIVACY_PAGE}`}>{t("Terms_Conditions")}</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default FooterMenu;
