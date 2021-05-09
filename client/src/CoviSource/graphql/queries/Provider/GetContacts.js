import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts($id: Float!) {
    getContact(providerID: $id) {
      id
      name
      phoneNumber
    }
  }
`;
