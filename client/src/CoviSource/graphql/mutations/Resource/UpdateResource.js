import { gql } from "@apollo/client";

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($input: ResourceUpdateInput!) {
    updateResource(input: $input) {
      errors {
        field
        message
      }
      resource {
        id
        name
        quantity
      }
    }
  }
`;
