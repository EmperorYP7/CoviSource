import { gql } from "@apollo/client";

export const GET_ALL_PROVIDERS = gql`
  query GetAllProviders {
    allProviders {
      _id
      providerName
      address
      location {
        latitude
        longitude
      }
      slug
      updatedAt
    }
  }
`;
