import { gql } from "@apollo/client";

export const DELETE_RESOURCE = gql`
  mutation DeleteResource($id: Float!) {
    deleteResource(id: $id)
  }
`;
