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

// const hoverColors = {
//   AVAILABLE:
//     "linear-gradient(90deg, rgba(102, 187, 106, 0.1) 0%, rgba(56, 142, 60, 0.1) 100%)",
//   UNAVAILABLE:
//     "linear-gradient(90deg, rgba(255, 167, 38, 0.1) 0%, rgba(245, 124, 0, 0.1) 100%)",
//   UNUPDATED:
//     "linear-gradient(90deg, rgba(239, 83, 80, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)",
// };

CardView.propTypes = {
  data: propTypes.arrayOf(Object),
};

export default function CardView(props) {
  const [data, setData] = useState(props.data);
  if (data === null) {
    setData("");
  }
  const classes = useStyles();

  //   const hoverFunction = function (e) {
  //     e.target.style.backgroundColor = "rgba(211, 47, 47, 0.1)";
  //   };

  //   const hoverRemove = function (e) {
  //     e.target.style.background = "#ffffff";
  //   };

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
                                <li
                                  key={id}
                                  className={status[details["availability"]]}
                                >
                                  <div className="data">
                                    <div className="dataResource">
                                      <h6>{item.resource}</h6>
                                    </div>
                                    <div className="dataQuantity">
                                      <p>
                                        <span>{item.quantity} </span>available
                                      </p>
                                    </div>
                                  </div>
                                  <div className="info">
                                    <div className="updateTag">
                                      <h6>updated</h6>
                                    </div>
                                    <div className="updateInfo">
                                      <p>
                                        <span>{item.updated} </span>, 2021
                                      </p>
                                    </div>
                                  </div>
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
