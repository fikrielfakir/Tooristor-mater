import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { AuthContext } from '../context/AuthProvider';
import Layout from '../container/Layout/Layout';
import {
  HOME_PAGE,
  PRODUCTS_PAGE,
  MESSAGES_PAGE,
  SETTINGS_PAGE,
  LOGIN_PAGE,
  CHANGE_PASSWORD_PAGE,
  FORGET_PASSWORD_PAGE
} from '../settings/constantOwner';

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
        import(/* webpackChunkName: "Home" */ '../container/dashbord'),
      loading: Loading,
      modules: ['Home'],
    }),
    exact: true,
  },
  {
    path: PRODUCTS_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Home" */ '../container/dashbord/pages/Products'),
      loading: Loading,
      modules: ['Products'],
    }),
    exact: true,
  },
  {
    path: MESSAGES_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Home" */ '../container/dashbord/pages/Messages'),
      loading: Loading,
      modules: ['Messages'],
    }),
    exact: true,
  },
  {
    path: SETTINGS_PAGE,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "Home" */ '../container/dashbord/pages/Settings'),
      loading: Loading,
      modules: ['Settings'],
    }),
    exact: true,
  },
];


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
          path={HOME_PAGE}
          component={HOME_PAGE}
        />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
