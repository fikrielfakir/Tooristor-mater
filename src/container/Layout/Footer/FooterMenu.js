import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import {
  HOME_PAGE,
  ABOUT_US,
  PRIVACY_PAGE,
  AGENT_PROFILE_CONTACT,
} from 'settings/constantClient';

const FooterMenu = () => {
  return (
    <Menu>
      <Menu.Item key="0">
        <NavLink to={`${HOME_PAGE}`}>Home</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to={`${ABOUT_US }`}>About us</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to={`${AGENT_PROFILE_CONTACT}`}>Contact us</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${PRIVACY_PAGE}`}>Privacy Policy</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to={`${PRIVACY_PAGE}`}>Terms & Conditions</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default FooterMenu;
