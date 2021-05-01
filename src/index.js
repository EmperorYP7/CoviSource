import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
<<<<<<< HEAD
// import LoginPage from "views/LoginPage/LoginPage.js";
import LandingPage from "CoviSource/Components/Pages/LandingPage/LandingPage";
import OrganisationPage from "CoviSource/Components/Pages/OrganisationPage/OrganisationPage";
=======
import RegistrationPage from "./CoviSource/Components/Pages/RegistrationPage/RegistrationPage";
import LandingPage from "./CoviSource/Components/Pages/LandingPage/LandingPage";
>>>>>>> 6f274dc40e5ab96c8c92514668c03125e28566a1

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />*/}
      <Route path="/register" component={RegistrationPage} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/:orgName" component={OrganisationPage} />
      <Route path="/components" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
