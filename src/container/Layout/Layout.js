import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout as LayoutWrapper } from 'antd';
import useWindowSize from 'library/hooks/useWindowSize';
import LayoutProvider from 'context/LayoutProvider';
import {
  LISTING_POSTS_PAGE,
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
  PRICING_PLAN_PAGE,
  SINGLE_POST_PAGE,
  PRIVACY_PAGE,
  CHANGE_PASSWORD_PAGE,
  FORGET_PASSWORD_PAGE,
  AGENT_IMAGE_EDIT_PAGE,
  //PAGES DASHBORD-OWNER
  HOME_OWNER,
  PRODUCTS_OWNER,
  MESSAGES_OWNER,
  SETTINGS_OWNER,

  // PAGES DASHBORD-ADMIN
DASHBORD_ADMIN,
PROJECTS_ADMIN,
ADD_PROJECTS_ADMIN,
PRODUCTS_ADMIN,
ADD_PRODUCTS_ADMIN,
CATEGORY_ADMIN,
ADD_CATEGORY_ADMIN,
MESSAGES_ADMIN,
SETTINGS_ADMIN,
NotFoundPage,

  AGENT_PASSWORD_CHANGE_PAGE
} from 'settings/constantClient';
import Header from './Header/Header';
import Footer from './Footer/Footer';
const { Content } = LayoutWrapper;

export default withRouter(function Layout({ children, location }) {
  const { width } = useWindowSize();
  const singlePageUrlFromConst = SINGLE_POST_PAGE.split('/');
  const singlePageUrlFormLocation = location.pathname.split('/');

  return (
    <LayoutProvider>
      {location.pathname === LOGIN_PAGE ||
       location.pathname === HOME_OWNER ||
       location.pathname === PRODUCTS_OWNER ||
       location.pathname === MESSAGES_OWNER ||
       location.pathname === SETTINGS_OWNER ||

         // PAGES DASHBORD-ADMIN
         location.pathname === DASHBORD_ADMIN ||
         location.pathname === PROJECTS_ADMIN ||
         location.pathname === ADD_PROJECTS_ADMIN ||
         location.pathname === PRODUCTS_ADMIN ||
         location.pathname === ADD_PRODUCTS_ADMIN ||
         location.pathname === CATEGORY_ADMIN ||
         location.pathname === ADD_CATEGORY_ADMIN ||
         location.pathname === MESSAGES_ADMIN ||
         location.pathname === SETTINGS_ADMIN ||

      location.pathname === CHANGE_PASSWORD_PAGE ||
      location.pathname === FORGET_PASSWORD_PAGE ||
      location.pathname === REGISTRATION_PAGE ? (
        <Content>{children}</Content>
      ) : (
        <Fragment>
          <Header />
          <Content>{children}</Content>
          {location.pathname === LISTING_POSTS_PAGE ||
          location.pathname === PRICING_PLAN_PAGE ||
          location.pathname === HOME_OWNER ||
          location.pathname === CHANGE_PASSWORD_PAGE ||
          location.pathname === FORGET_PASSWORD_PAGE ||
          location.pathname === PRIVACY_PAGE ||
          location.pathname ===
            `${AGENT_ACCOUNT_SETTINGS_PAGE + AGENT_IMAGE_EDIT_PAGE}` ||
          location.pathname ===
            `${AGENT_ACCOUNT_SETTINGS_PAGE + AGENT_PASSWORD_CHANGE_PAGE}` ||
          location.pathname === AGENT_ACCOUNT_SETTINGS_PAGE ? (
            <div style={{ height: '33px' }} />
          ) : (
            <Fragment>
              <Footer />
              {singlePageUrlFormLocation[1] === singlePageUrlFromConst[1] && (
                <Fragment>
                  {width < 1200 && <div style={{ height: '74px' }} />}
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </LayoutProvider>
  );
});
