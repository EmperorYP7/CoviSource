import { gql } from "@apollo/client";

export const MY_PROVIDER = gql`
  query MyProvider {
    myProvider {
      _id
      providerName
      address
      location {
        latitude
        longitude
      }
      slug
      updatedAt
      createdAt
    }
  }
`;
