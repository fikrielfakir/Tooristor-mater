import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  AGENT_PROFILE_PAGE,
  PRICING_PLAN_PAGE,
} from 'settings/constantClient';

const MainMenu = ({ className }) => {
  return (
    <Menu className={className}>

    </Menu>
  );
};

export default MainMenu;
