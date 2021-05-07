import React from "react";
import propTypes from "prop-types";

import UI_HEADER from "components/Header/Header.js";
import { logoURL } from "CoviSource/UtilityFunctions";

Header.propTypes = {
  theme: propTypes.string,
};

export default function Header(props) {
  const { ...rest } = props;
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
      {...rest}
    />
  );
}
