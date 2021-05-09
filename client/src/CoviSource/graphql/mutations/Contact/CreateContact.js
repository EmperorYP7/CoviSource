import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
      errors {
        field
        message
      }
      contact {
        id
        providerID
        name
        phoneNumber
      }
    }
  }
`;
