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
import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "CoviSource/graphql/queries/Provider/GetResources";
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
  if (data === []) {
    return <>No data</>;
  }
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
            {data.map((provider, _id) => {
              var availability;
              // 10 minutes
              if (Date.now() - provider.updatedAt <= 600000) {
                availability = "AVAILABLE";
              } else {
                availability = "UNUPDATED";
              }
              if (resourceType === "ALL" || resourceType === availability) {
                return (
                  <GridItem key={_id} xs={12} sm={12} md={6}>
                    <CustomTabs
                      title={
                        <h6 onClick={shareIconClick} style={style}>
                          {isMobile() ? "" : "share "}
                          <i
                            name={`${provider.providerName}`}
                            className="fas fa-share"
                          ></i>
                        </h6>
                      }
                      rtlActive={true}
                      headerColor={status[availability]}
                      tabs={[
                        {
                          tabName: "AVAILABILITY",
                          tabContent: ResourceDetail(provider._id),
                        },
                        {
                          tabName: "DETAILS",
                          // tabIcon: Share,
                          tabContent: (
                            <ul className="cardViewList">
                              <li className={status[availability] + " detail"}>
                                <div className="details">
                                  <div className="detailsInfo">
                                    <h6>ADDRESS</h6>
                                  </div>
                                  <div className="detailsData">
                                    <p>
                                      <span>{provider.address}</span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                              <li className={status[availability]}>
                                <div className="data">
                                  <div className="dataResource">
                                    <h6>contact</h6>
                                  </div>
                                  <div className="dataQuantity">
                                    <p>
                                      <span>{provider.contactPersonName}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="info">
                                  <div className="updateTag">
                                    <h6>phone</h6>
                                  </div>
                                  <div className="updateInfo">
                                    <p>
                                      <span>{provider.phoneNumber}</span>
                                    </p>
                                  </div>
                                </div>
                              </li>
                              <li className={status[availability] + " detail"}>
                                <div className="details">
                                  <div className="detailsInfo">
                                    <h6>{provider.serviceName}</h6>
                                  </div>
                                  <div className="detailsData">
                                    <p>
                                      <span>{provider.providerName}</span>
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
                          name={provider.slug}
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

function ResourceDetail(Providerid) {
  const { loading, data, error } = useQuery(GET_RESOURCES, {
    variables: {
      id: Providerid,
    },
  });
  if (loading) return <>Loading...</>;
  if (error) {
    alert(error);
    return <>Error!</>;
  }
  if (data) {
    if (data.getResource) {
      return (
        <ul className="cardViewList">
          {data.getResource.map((resource, id) => {
            var date = new Date(parseInt(resource.updatedAt));
            return (
              <li
                key={id}
                // className={status[provider["availability"]]}
              >
                <div className="data">
                  <div className="dataResource">
                    <h6>{resource.name}</h6>
                  </div>
                  <div className="dataQuantity">
                    <p>
                      <span>{resource.quantity} </span>available
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="updateTag">
                    <h6>updated</h6>
                  </div>
                  <div className="updateInfo">
                    <p>
                      <span>{date.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
