import { gql } from "@apollo/client";

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Float!) {
    deleteContact(id: $id)
  }
`;
