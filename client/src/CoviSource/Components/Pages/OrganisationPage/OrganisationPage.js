import React from "react";
import { useQuery } from "@apollo/client";
import { FIND_PROVIDER } from "CoviSource/graphql/queries/Provider/FindProvider";
import { useParams } from "react-router-dom";
import Contacts from "./Contacts";
import { makeStyles } from "@material-ui/core";
import styles from "assets/jss/material-kit-react/views/components.js";
import "./OrganisationPage.scss";
import Resources from "./Resources";
import Header from "CoviSource/Components/UtilityComponents/Header/Header";
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
  const params = useParams();
  const { loading, data, error } = useQuery(FIND_PROVIDER, {
    variables: {
      slug: `${params.orgName}`,
    },
  });
  if (loading) return <>Loading</>;
  if (error) {
    console.log(error);
    return <>Error</>;
  }

  const getBannerClass = function () {
    return "banner banner" + status[data.availability];
  };

  const scrollChangeData = {
    height: 5,
    color: "white",
  };

  if (data.findProviderbySlug === null) {
    return <>Provider Not found!</>;
  }
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
              <h6>{data.findProviderbySlug.providerName}</h6>
              <h2>{data.findProviderbySlug.providerName}</h2>
            </div>
          </div>
          <div className="info">
            <div className="infoContainer">
              <Resources providerID={data.findProviderbySlug._id} />
              <Contacts providerID={data.findProviderbySlug._id} />

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
                        <strong>{data.findProviderbySlug.address}</strong>
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
            currentPosition={{
              lat: data.findProviderbySlug.location.latitude,
              lng: data.findProviderbySlug.location.longitude,
            }}
            zoom={14}
            hideMapSearch={true}
          />
        </div>
      </div>
    </>
  );
}
