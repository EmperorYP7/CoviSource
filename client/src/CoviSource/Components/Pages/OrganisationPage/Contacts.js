import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACTS } from "CoviSource/graphql/queries/Provider/GetContacts";
import propTypes from "prop-types";

Contacts.propTypes = {
  providerID: propTypes.number,
};

export default function Contacts({ providerID }) {
  const { loading, data, error } = useQuery(GET_CONTACTS, {
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
      <ul>
        <li>
          <div className="resourceList">
            <div className="infoData">
              <h6>contacts</h6>
            </div>
            <div className="infoValue"></div>
          </div>
        </li>
        {data.getContact.map((item, id) => {
          return (
            <li key={id}>
              <div className="resourceList">
                <div className="infoData">
                  <h6>
                    <strong>{item.name}</strong> <br />
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
    </div>
  );
}
