import React from "react";
import propTypes from "prop-types";

import _Header from "components/Header/Header.js";
import { logoURL } from "CoviSource/UtilityFunctions";

Header.propTypes = {
  theme: propTypes.string,
};

export default function Header(props) {
  const { ...rest } = props;
  return (
    <_Header
      brand={logoURL(props.theme)}
      // trace tha header folder and update the headerlink.js to edit right links
      fixed
      color="transparent"
      changeColorOnScroll={{
        height: 200,
        color: "primary",
      }}
      {...rest}
    />
  );
}
