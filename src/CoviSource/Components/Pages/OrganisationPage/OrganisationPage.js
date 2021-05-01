import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import styles from "assets/jss/material-kit-react/views/components.js";
const useStyles = makeStyles(styles);

const status = {
  AVAILABLE: "success",
  UNAVAILABLE: "danger",
  UNUPDATED: "warning",
};

import "./OrganisationPage.scss";

import Header from "CoviSource/Components/UtilityComponents/Header/Header";
import { logoURL } from "CoviSource/UtilityFunctions";

export default function OrganisationPage() {
  const classes = useStyles();
  const data = {
    username: "someUsername",
    resourceProviderName: "Resource Provider Name",
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
    address: "Provider Address",
    contacts: [
      {
        contactPersonName: "Contact Person's Name 1",
        contactNumber: "9821095754",
      },
      {
        contactPersonName: "Contact Person's Name 2",
        contactNumber: "9821095754",
      },
      {
        contactPersonName: "Contact Person's Name 3",
        contactNumber: "9821095754",
      },
    ],
    serviceName: "Service Provided",
  };
  const params = useParams();
  console.log(params.orgName);

  const getBannerClass = function () {
    return "banner" + " banner" + status[data.availability];
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
                      <h6>
                        <strong>resources</strong>
                      </h6>
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
                      <h6>
                        <strong>contact</strong>
                      </h6>
                    </div>
                    <div className="infoValue">
                      <h6></h6>
                    </div>
                  </div>
                </li>
                {data.contacts.map((item, id) => {
                  return (
                    <li key={id}>
                      <div className="resourceList">
                        <div className="infoData">
                          <h6>
                            {item.contactPersonName} <br />
                          </h6>
                        </div>
                        <div className="infoValue">
                          <h6>
                            {item.contactNumber}
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
                      <h6>
                        <strong>Address</strong>
                      </h6>
                    </div>
                    <div className="infoValue">
                      <h6></h6>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="resourceList">
                    <div className="infoData">
                      <h6>{data.address}</h6>
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
                    <div className="infoValue">
                      <h6></h6>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="location">
          <img height="70px" src={logoURL("LIGHT")} alt="" />
          <h4>Find resources that you need</h4>
        </div>
      </div>
    </>
  );
}