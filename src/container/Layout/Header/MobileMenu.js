import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AuthContext } from 'context/AuthProvider';
import { useTranslation } from 'react-i18next';
import {

  HOME_PAGE,
  CONTACT_PAGE,
  ABOUT_US,
  PRIVACY_PAGE,
  TERME_CONDITION,
} from 'settings/constantClient';

const MobileMenu = ({ className }) => {
  const {t} = useTranslation();
  // auth context
  const { loggedIn, logOut } = useContext(AuthContext);

  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink exact to={HOME_PAGE}>
        {t("Home")}
        </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={ABOUT_US}>{t("About_us")}</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={CONTACT_PAGE}>{t("Contact_us")}</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={PRIVACY_PAGE}>{t("Privacy_Policy")}</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={TERME_CONDITION}>{t("Terms_Conditions")}</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default MobileMenu;
