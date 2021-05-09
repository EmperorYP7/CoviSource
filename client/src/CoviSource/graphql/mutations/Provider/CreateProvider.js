import { gql } from "@apollo/client";

export const CREATE_PROVIDER = gql`
  mutation CreateProvider($input: NewProviderInput!) {
    createProvider(input: $input) {
      providerName
      updatedAt
      _id
      ownerID
      slug
      location {
        latitude
        longitude
      }
      address
    }
  }
`;
