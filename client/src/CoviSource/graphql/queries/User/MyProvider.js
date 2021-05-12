import { gql } from "@apollo/client";

export const MY_PROVIDER = gql`
  query MyProvider {
    myProvider {
      providerName
      address
      location {
        latitude
        longitude
      }
      slug
      _id
      updatedAt
      createdAt
    }
  }
`;
