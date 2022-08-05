import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import { LOGIN_PAGE, REGISTRATION_PAGE } from 'settings/constantClient';

const AuthMenu = ({ className }) => {
  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <NavLink to={LOGIN_PAGE}>Access to my project</NavLink>
      </Menu.Item>
     
    </Menu>
  );
};

export default AuthMenu;
