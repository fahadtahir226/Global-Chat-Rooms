import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import SignIn from './Views/SignIn';
import SignUp from './Views/SignUp';
import Dashboard from './Views/Dashboard';
import { NotFound } from './Views/Notfound';

// import icon from './Images/logo.svg'


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/dashboard/main" />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route path="/dashboard/" component={Dashboard} />
        <Route to="/not-found" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
