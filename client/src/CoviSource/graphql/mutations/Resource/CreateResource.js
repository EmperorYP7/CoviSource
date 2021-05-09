import { gql } from "@apollo/client";

export const CREATE_RESOURCE = gql`
  mutation CreateResource($input: ResourceInput!) {
    createResource(input: $input) {
      errors {
        field
        message
      }
      resource {
        providerID
        name
        quantity
        createdAt
        updatedAt
      }
    }
  }
`;
