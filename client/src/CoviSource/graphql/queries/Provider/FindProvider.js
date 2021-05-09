import { gql } from "@apollo/client";

export const FIND_PROVIDER = gql`
  query FindProvider($slug: String!) {
    findProviderbySlug(slug: $slug) {
      id
      providerName
      address
      location {
        latitude
        longitude
      }
      createdAt
      updatedAt
    }
  }
`;
