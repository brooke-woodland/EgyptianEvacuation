import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './components/Home';
import { BurialSummary } from './components/burial/BurialSummary';
import BurialTest from './components/burial/burialtest/burialtest';
import { SupervisedAnalysis } from './components/SupervisedAnalysis';
import { UnsupervisedAnalysis } from './components/UnsupervisedAnalysis';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <AuthorizeRoute path="/burial-summary" component={BurialSummary} />
        <Route path="/burial-test" render={() => <BurialTest />} />
        <Route path="/supervised-analysis" component={SupervisedAnalysis} />
        <Route path="/unsupervised-analysis" component={UnsupervisedAnalysis} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
      </Layout>
    );
  }
}
