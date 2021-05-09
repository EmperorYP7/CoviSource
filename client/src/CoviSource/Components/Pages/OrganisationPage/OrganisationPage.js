import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import styles from "assets/jss/material-kit-react/views/components.js";

import "./OrganisationPage.scss";

import Header from "CoviSource/Components/UtilityComponents/Header/Header";
// import { logoURL } from "CoviSource/UtilityFunctions";
import { isMobile } from "CoviSource/UtilityFunctions";
import Map from "CoviSource/Components/UtilityComponents/Map/Map";
const useStyles = makeStyles(styles);

const status = {
  AVAILABLE: "success",
  UNAVAILABLE: "danger",
  UNUPDATED: "warning",
};

export default function OrganisationPage() {
  const classes = useStyles();
  const data = {
    username: "someUsername",
    resourceProviderName: "Fortis Hospital, Kalyan",
    availability: "AVAILABLE",
    resources: [
      {
        resource: "Oxygen refilling",
        quantity: 32,
        updated: "06:00 PM, 27 APRIL",
      },
      {
        resource: "Hospital Beds",
        quantity: 23,
        updated: "06:00 PM, 27 APRIL",
      },
      {
        resource: "Remdesivir Vials",
        quantity: 65,
        updated: "06:00 PM, 27 APRIL",
      },
    ],
    address:
      "Fortis Hospital,\n Near Kalyan Market,\n Kalyan West,\n Maharashtra, India - 421306",
    contacts: [
      {
        contactPersonName: "Dr. Gaurav Bhatt",
        phoneNumber: "9821095754",
      },
      {
        contactPersonName: "Dr. Ashok Bhoir",
        phoneNumber: "9821095754",
      },
      {
        contactPersonName: "Dr. Rupender Singh Sodhi",
        phoneNumber: "9821095754",
      },
    ],
    serviceName: "Service Provided",
    location: {
      lat: 19.21832,
      lng: 73.1273,
    },
  };
  const params = useParams();
  console.log(params.orgName);

  const getBannerClass = function () {
    return "banner banner" + status[data.availability];
  };

  const scrollChangeData = {
    height: 5,
    color: "white",
  };

  return (
    <>
      <Header
        theme={"DARK"}
        color="transparent"
        changeColorOnScroll={scrollChangeData}
      />

      <div className={(classes.container, "orgView")}>
        <div className="information">
          <div className="header">
            <div className={getBannerClass()}></div>
            <div className="headInfo">
              <h6>{data.serviceName}</h6>
              <h2>{data.resourceProviderName}</h2>
            </div>
          </div>
          <div className="info">
            <div className="infoContainer">
              {/* Resources */}
              <ul>
                <li>
                  <div className="resourceList">
                    <div className="infoData">
                      <h6>resources</h6>
                    </div>
                    <div className="infoValue">
                      <h6>updated</h6>
                    </div>
                  </div>
                </li>
                {data.resources.map((item, id) => {
                  return (
                    <li key={id}>
                      <div className="resourceList">
                        <div className="infoData">
                          <h6>
                            <strong>{item.resource}</strong> <br />
                            <strong>{item.quantity}</strong> Available
                          </h6>
                        </div>
                        <div className="infoValue">
                          <h6>
                            <strong>{item.updated}</strong>, 2021 <br />
                          </h6>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Contacts */}
              <ul>
                <li>
                  <div className="resourceList">
                    <div className="infoData">
                      <h6>contacts</h6>
                    </div>
                    <div className="infoValue"></div>
                  </div>
                </li>
                {data.contacts.map((item, id) => {
                  return (
                    <li key={id}>
                      <div className="resourceList">
                        <div className="infoData">
                          <h6>
                            <strong>{item.contactPersonName}</strong> <br />
                          </h6>
                        </div>
                        <div className="infoValue">
                          <h6>
                            <strong>{item.phoneNumber}</strong>
                            <br />
                          </h6>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Address */}
              <ul>
                <li>
                  <div className="resourceList">
                    <div className="infoData">
                      <h6>address</h6>
                    </div>
                    <div className="infoValue"></div>
                  </div>
                </li>
                <li>
                  <div className="resourceList">
                    <div className="infoData">
                      <h6>
                        <strong>{data.address}</strong>
                      </h6>
                    </div>
                    <div className="infoValue">
                      <h6>
                        <strong></strong>
                      </h6>
                    </div>
                  </div>
                </li>
              </ul>

              {/* Share Icon */}
              <ul>
                <li>
                  <div className="resourceList">
                    <div className="infoData">
                      <h6>
                        <strong>
                          share <i className="fas fa-share"></i>
                        </strong>
                      </h6>
                    </div>
                    <div className="infoValue"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="location">
          <Map
            height={"100vh"}
            width={isMobile() ? "100vw" : "50vw"}
            currentPosition={data.location}
            zoom={14}
            hideMapSearch={true}
          />
        </div>
      </div>
    </>
  );
}
