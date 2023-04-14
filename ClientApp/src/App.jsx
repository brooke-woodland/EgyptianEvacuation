import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './components/Home';
import FetchData from './components/burial/BurialSummary';
import SupervisedAnalysis from './components/SupervisedAnalysis';
import { UnsupervisedAnalysis } from './components/UnsupervisedAnalysis';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import UserRoles from './components/api-authorization/UserRoles';
import { PrivacyPolicy } from './components/Privacy'
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/burial-summary" render={() => <FetchData />} />
            <Route
                path="/supervised-analysis"
                render={() => <SupervisedAnalysis />}
            />
            <Route path="/unsupervised-analysis" component={UnsupervisedAnalysis} />
            <Route path="/roles" component={UserRoles} />
            <Route
                path={ApplicationPaths.ApiAuthorizationPrefix}
                component={ApiAuthorizationRoutes} />
            <Route path="/privacy" component={ PrivacyPolicy }/>
        </Layout>
    );
  }
}
