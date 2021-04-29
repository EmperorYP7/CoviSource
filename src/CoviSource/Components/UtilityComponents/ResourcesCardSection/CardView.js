import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import "./CardView.scss";
const useStyles = makeStyles(styles);

const status = {
  AVAILABLE: "success",
  UNAVAILABLE: "danger",
  UNUPDATED: "warning",
};

CardView.propTypes = {
  data: propTypes.arrayOf(Object),
};

export default function CardView(props) {
  const [data, setData] = useState(props.data);
  if (data === null) {
    setData("");
  }
  const classes = useStyles();

  useEffect(() => {}, []);
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Resources</h2>
          <div className={classes.space70} />
        </div>
        <div id="nav-tabs">
          <GridContainer>
            {data.map((details, key) => {
              return (
                <GridItem key={key} xs={12} sm={12} md={6}>
                  {console.log(key)}
                  <CustomTabs
                    rtlActive={true}
                    headerColor={status[details["availability"]]}
                    tabs={[
                      {
                        tabName: "AVAILABILITY",
                        tabContent: (
                          <ul className="cardViewList">
                            {details.resources.map((item, id) => {
                              return (
                                <li key={id}>
                                  <div className="data">{item.resource}</div>
                                  <div className="info">{item.updated}</div>
                                </li>
                              );
                            })}
                          </ul>
                        ),
                      },
                      {
                        tabName: "DETAILS",
                        // tabIcon: Share,
                        tabContent: (
                          <p className={classes.textCenter}>
                            I think that’s a responsibility that I have, to push
                            possibilities, to show people, this is the level
                            that things could be at. I will be the leader of a
                            company that ends up being worth billions of
                            dollars, because I got the answers. I understand
                            culture. I am the nucleus. I think that’s a
                            responsibility that I have, to push possibilities,
                            to show people, this is the level that things could
                            be at.
                          </p>
                        ),
                      },
                    ]}
                  />
                </GridItem>
              );
            })}
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
