import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "CoviSource/Components/Pages/LandingPage/LandingPage";
import OrganisationPage from "CoviSource/Components/Pages/OrganisationPage/OrganisationPage";
import RegistrationPage from "CoviSource/Components/Pages/RegistrationPage/RegistrationPage";
import Login from "CoviSource/Components/Pages/LoginPage/Login";
import CreateProvider from "CoviSource/Components/Pages/CreateProvider/CreateProvider";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});

var hist = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        <Route path="/register" component={RegistrationPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/new" component={CreateProvider} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/:orgName" component={OrganisationPage} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
