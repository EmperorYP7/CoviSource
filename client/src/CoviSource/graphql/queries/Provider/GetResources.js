import { gql } from "@apollo/client";

export const GET_RESOURCES = gql`
  query GetResources($id: Float!) {
    getResource(providerID: $id) {
      id
      name
      quantity
      updatedAt
    }
  }
`;
