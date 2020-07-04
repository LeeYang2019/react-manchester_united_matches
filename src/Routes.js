import React from 'react';
import Layout from './HOC/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <Route exact component={SignIn} path="/sign_in" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};

export default Routes;
