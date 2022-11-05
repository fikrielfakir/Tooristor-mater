import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { AuthContext } from '../context/AuthProvider';
import Layout from '../container/Layout/Layout';
import {
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  FORGET_PASSWORD_PAGE,
  HOME_PAGE,
  CONTACT_PAGE,
  LISTING_POSTS_PAGE,
  SINGLE_POST_PAGE,
  AGENT_PROFILE_PAGE,
  DETAIL_POSTS_PAGE,
  DETAIL_POSTS_PAGE_SHOP,
  AGENT_ACCOUNT_SETTINGS_PAGE,
  PRIVACY_PAGE,
  PRICING_PLAN_PAGE,
  DASHBORD_OWNER_PAGE,
  PRODUCTS_OWNER,
  MESSAGES_OWNER
} from '../settings/constantClient';

/**
 *
 * Public Routes
 *
 */
const Loading = () => null;

const routes = [
  {
    path: HOME_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Home" */ '../container/Home/Home'),
      loading: Loading,
      modules: ['Home'],
    }),
    exact: true,
  },
  {
    path: DETAIL_POSTS_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "DEtAIL" */ '../container/Listing/Products/ProductsDetail'),
      loading: Loading,
      modules: ['DetailPost'],
    }),
  },
  {
    path: DETAIL_POSTS_PAGE_SHOP,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "DEtAIL" */ '../container/Listing/shop/ShopDetail'),
      loading: Loading,
      modules: ['DetailPostShop'],
    }),
  },
  {
    path: LOGIN_PAGE,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SignIn" */ '../container/Auth/SignIn/SignIn'
        ),
      loading: Loading,
      modules: ['SignIn'],
    }),
  },
  {
    path: PRODUCTS_OWNER,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SignIn" */ '../container/dashbord/pages/Products'
        ),
      loading: Loading,
      modules: ['products-owner'],
    }),
  },
  {
    path: MESSAGES_OWNER,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SignIn" */ '../container/dashbord/pages/messages'
        ),
      loading: Loading,
      modules: ['message-owner'],
    }),
  },
  {
    path: REGISTRATION_PAGE,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SignUp" */ '../container/Auth/SignUp/SignUp'
        ),
      loading: Loading,
      modules: ['SignUp'],
    }),
  },
  {
    path: FORGET_PASSWORD_PAGE,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "ForgetPassword" */ '../container/Auth/ForgetPassword'
        ),
      loading: Loading,
      modules: ['ForgetPassword'],
    }),
  },
 
  {
    path: `${SINGLE_POST_PAGE}/:slug`,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "SinglePageView" */ '../container/SinglePage/SinglePageView'
        ),
      loading: Loading,
      modules: ['SinglePageView'],
    }),
  },
  {
    path: LISTING_POSTS_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Listing" */ '../container/Listing/Listing'),
      loading: Loading,
      modules: ['Listing'],
    }),
  },
 
  {
    path: AGENT_PROFILE_PAGE,
    component: Loadable({
      loader: () =>
        import(
          /* webpackChunkName: "AgentDetailsViewPage" */ '../container/Agent/AccountDetails/AgentDetailsViewPage'
        ),
      loading: Loading,
      modules: ['AgentDetailsViewPage'],
    }),
  },
  {
    path: PRIVACY_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "privacy" */ '../container/Privacy/Privacy'),
      loading: Loading,
      modules: ['Privacy'],
    }),
  },
  {
    path: CONTACT_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "CONTACT" */ '../container/contact/Contact'),
      loading: Loading,
      modules: ['Privacy'],
    }),
  },
  {
    path: PRICING_PLAN_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Pricing" */ '../container/Pricing/Pricing'),
      loading: Loading,
      modules: ['Pricing'],
    }),
  }
];



const AgentAccountSettingsPage = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "AgentAccountSettingsPage" */ '../container/Agent/AccountSettings/AgentAccountSettingsPage'
    ),
  loading: Loading,
  modules: ['AgentAccountSettingsPage'],
});

/**
 *
 * Not Found Route Component
 *
 */

const NotFound = Loadable({
  loader: () =>
    import(/* webpackChunkName: "NotFound" */ '../container/404/404'),
  loading: Loading,
  modules: ['NotFound'],
});

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Route
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to={LOGIN_PAGE} />
      }
      {...rest}
    />
  );
};


const Routes = () => {
  return (
    <Layout>
      <Switch>
        {routes.map(({ path, component, exact = false }) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
        
        <ProtectedRoute
          path={AGENT_ACCOUNT_SETTINGS_PAGE}
          component={AgentAccountSettingsPage}
        />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
