import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "CoviSource/Components/UtilityComponents/CustomTabs/CustomTabs.js";
import Button from "CoviSource/Components/UtilityComponents/Button/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import "./CardView.scss";
import { isMobile } from "CoviSource/UtilityFunctions";
const useStyles = makeStyles(styles);

const status = {
  AVAILABLE: "success",
  UNAVAILABLE: "danger",
  UNUPDATED: "warning",
};

// const resourceTypes = {};

CardView.propTypes = {
  data: propTypes.arrayOf(Object),
};

export default function CardView(props) {
  const [data, setData] = useState(props.data);
  const [resourceType, setResourceType] = useState("ALL"); // oneOf["ALL", "AVAILABLE", "UNUPDATED", "UNAVAIBALE"]
  if (data === null) {
    setData("");
  }
  const classes = useStyles();

  const selectResourceType = function (e) {
    setResourceType(e.target.innerText);
  };

  const style = {
    margin: 0,
    padding: 0,
    color: "#fff",
    cursor: "pointer",
  };

  const shareIconClick = function (e) {
    console.log("Shared ", e.target.getAttribute("name"));
  };

  const moreDetails = function (e) {
    window.location.href = `/${e.target.getAttribute("name")}`;
  };

  useEffect(() => {}, [resourceType]);
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Resources</h2>
          <div className={classes.space30} />
          <Button
            onClick={selectResourceType}
            size={isMobile() ? "sm" : "md"}
            color="primary"
          >
            All
          </Button>
          <Button
            onClick={selectResourceType}
            size={isMobile() ? "sm" : "md"}
            color="success"
          >
            Available
          </Button>
          <Button
            onClick={selectResourceType}
            size={isMobile() ? "sm" : "md"}
            color="warning"
          >
            unupdated
          </Button>
          <Button
            onClick={selectResourceType}
            size={isMobile() ? "sm" : "md"}
            color="danger"
          >
            Unavailable
          </Button>
          <div className={classes.space70} />
        </div>
        <div id="nav-tabs">
          <GridContainer>
            {data.map((details, key) => {
              if (
                resourceType === "ALL" ||
                resourceType === details["availability"]
              ) {
                return (
                  <GridItem key={key} xs={12} sm={12} md={6}>
                    <CustomTabs
                      title={
                        <h6 onClick={shareIconClick} style={style}>
                          {isMobile() ? "" : "share "}
                          <i
                            name={details["resourceProviderName"]}
                            className="fas fa-share"
                          ></i>
                        </h6>
                      }
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
                            <ul className="cardViewList">
                              <li
                                className={
                                  status[details["availability"]] + " detail"
                                }
                              >
                                <div className="details">
                                  <div className="detailsInfo">
                                    <h6>ADDRESS</h6>
                                  </div>
                                  <div className="detailsData">
                                    <p>
                                      <span>{details.address}</span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                              <li className={status[details["availability"]]}>
                                <div className="data">
                                  <div className="dataResource">
                                    <h6>contact</h6>
                                  </div>
                                  <div className="dataQuantity">
                                    <p>
                                      <span>{details.contactPersonName}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="info">
                                  <div className="updateTag">
                                    <h6>phone</h6>
                                  </div>
                                  <div className="updateInfo">
                                    <p>
                                      <span>{details.phoneNumber}</span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                              <li
                                className={
                                  status[details["availability"]] + " detail"
                                }
                              >
                                <div className="details">
                                  <div className="detailsInfo">
                                    <h6>{details.serviceName}</h6>
                                  </div>
                                  <div className="detailsData">
                                    <p>
                                      <span>
                                        {details.resourceProviderName}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          ),
                        },
                      ]}
                      footerChildren={
                        <h6
                          className="footerLink"
                          onClick={moreDetails}
                          name={details.resourceProviderName}
                        >
                          More details ...
                        </h6>
                      }
                    />
                  </GridItem>
                );
              } else {
                return null;
              }
            })}
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
