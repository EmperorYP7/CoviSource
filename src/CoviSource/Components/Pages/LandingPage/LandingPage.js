import React from "react";
import { makeStyles } from "@material-ui/core";

// core components
import Header from "components/Header/Header.js";
// import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";

// sections for the page
import HeaderLinks from "components/Header/HeaderLinks.js";

// utility components
import SearchBar from "CoviSource/Components/UtilityComponents/SearchBar/SearchBar";

import styles from "assets/jss/material-kit-react/views/components.js";

import { isMobile } from "CoviSource/UtilityFunctions";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const onSearchButtonClick = function () {
    console.log("Search Button Clicked");
  };

  return (
    <div>
      <Header
        brand="https://raw.githubusercontent.com/EricLiclair/imageHost/e730d59edbca9d8992f90948ae91275e632b9e28/COVISOURCE.svg"
        // trace tha header folder and update the headerlink.js to edit right links
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        image={
          "https://github.com/EricLiclair/imageHost/blob/master/bg04.png?raw=true"
        }
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>
                  <img
                    src="https://raw.githubusercontent.com/EricLiclair/imageHost/e730d59edbca9d8992f90948ae91275e632b9e28/COVISOURCE.svg"
                    height={isMobile() ? "35px" : "62px"}
                    alt=""
                  />
                </h1>
                <h3 className={classes.subtitleReduced}>
                  Find resources that you need
                </h3>
              </div>
            </GridItem>
          </GridContainer>
          <SearchBar tags={["Oxygen"]} callBackFunction={onSearchButtonClick} />
        </div>
      </Parallax>
    </div>
  );
}
