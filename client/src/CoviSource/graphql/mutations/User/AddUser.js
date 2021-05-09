import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($input: UserRegisterInput!) {
    register(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;
