import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "CoviSource/graphql/queries/Provider/GetResources";
import propTypes from "prop-types";

Resources.propTypes = {
  providerID: propTypes.number,
};

export default function Resources({ providerID }) {
  const { loading, data, error } = useQuery(GET_RESOURCES, {
    variables: {
      id: providerID,
    },
  });
  if (loading) return <>Loading</>;
  if (error) {
    console.log(error);
    return <>Error</>;
  }
  return (
    <div>
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
        {data.getResource.map((item, id) => {
          return (
            <li key={id}>
              <div className="resourceList">
                <div className="infoData">
                  <h6>
                    <strong>{item.name}</strong> <br />
                    <strong>{item.quantity}</strong> Available
                  </h6>
                </div>
                <div className="infoValue">
                  <h6>
                    <strong>{item.updatedAt.toString()}</strong>, 2021 <br />
                  </h6>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
