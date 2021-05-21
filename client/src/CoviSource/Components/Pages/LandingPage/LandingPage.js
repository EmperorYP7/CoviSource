import React from "react";
import { makeStyles } from "@material-ui/core";

// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import Header from "CoviSource/Components/UtilityComponents/Header/Header";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

// sections for the page
import ResourcesCardView from "CoviSource/Components/UtilityComponents/ResourcesCardSection/CardView";
// utility components
import SearchBar from "CoviSource/Components/UtilityComponents/SearchBar/SearchBar";

import styles from "assets/jss/material-kit-react/views/components.js";

import { isMobile } from "CoviSource/UtilityFunctions";
import coviLogo from "assets/img/logo.svg";
import bgImage from "assets/img/bg.jpg";
import { useQuery } from "@apollo/client";
import { GET_ALL_PROVIDERS } from "CoviSource/graphql/queries/Provider/GetAllProviders";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { loading, data, error } = useQuery(GET_ALL_PROVIDERS);
  if (loading) return <>Loading...</>;
  if (error) return <>Error</>;

  const onSearchButtonClick = function () {
    console.log("Search Button Clicked");
  };

  const renderResourcesCards = () => {
    return (
      <div
        className={
          isMobile()
            ? classNames(classes.main)
            : classNames(classes.main, classes.mainRaised)
        }
      >
        <ResourcesCardView data={data.allProviders} />
      </div>
    );
  };
  if (data.allProviders) {
    return (
      <div>
        <Header theme="LIGHT" {...rest} />
        <Parallax image={bgImage}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>
                    <img
                      src={coviLogo}
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
            <SearchBar
              tags={["Oxygen"]}
              callBackFunction={onSearchButtonClick}
            />
          </div>
        </Parallax>
        {renderResourcesCards()}
      </div>
    );
  }
}
