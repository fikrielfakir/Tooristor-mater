import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';

import { LOGIN_PAGE, REGISTRATION_PAGE } from 'settings/constantClient';

const AuthMenu = ({ className }) => {
  const { t, i18n } = useTranslation();
  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink to={LOGIN_PAGE}>{t("Access_to_my_project")}</NavLink>
      </Menu.Item>
     
    </Menu>
  );
};

export default AuthMenu;
