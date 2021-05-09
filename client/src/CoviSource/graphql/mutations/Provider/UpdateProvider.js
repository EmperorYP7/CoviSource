import { gql } from "@apollo/client";

export const UPDATE_PROVIDER = gql`
  mutation UpdateProvider($input: NewProviderInput!) {
    updateProvider(input: $input) {
      _id
      providerName
      updatedAt
      slug
      location {
        latitude
        longitude
      }
      address
    }
  }
`;
