import React from "react";
import { NavLink } from "react-router-dom";
import propTypes from "prop-types";

import UI_HEADER from "components/Header/Header.js";
import { logoURL } from "CoviSource/UtilityFunctions";
import "./Header.scss";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "CoviSource/graphql/queries/User/GetUser";
import { LOGOUT } from "CoviSource/graphql/mutations/User/Logout";

Header.propTypes = {
  theme: propTypes.string,
};

export default function Header(props) {
  const { ...rest } = props;
  const { data, loading } = useQuery(GET_USER);
  const [logout] = useMutation(LOGOUT);
  const handleLogout = () => {
    logout();
    window.location.assign("/");
  };
  let body = null;
  if (!loading && !data) {
    body = (
      <>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </>
    );
  } else {
    body = (
      <>
        <NavLink className="nav-link" to="/slug">
          My Provider
        </NavLink>
        <NavLink className="nav-link" to="/new">
          Register Provider
        </NavLink>
        <NavLink className="nav-link" onClick={handleLogout} to="/">
          Logout
        </NavLink>
      </>
    );
  }
  return (
    <UI_HEADER
      brand={logoURL(props.theme)}
      // trace tha header folder and update the headerlink.js to edit right links
      fixed
      color="transparent"
      changeColorOnScroll={{
        height: 200,
        color: "primary",
      }}
      rightLinks={body}
      {...rest}
    />
  );
}
