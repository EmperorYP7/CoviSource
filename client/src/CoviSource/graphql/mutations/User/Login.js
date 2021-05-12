import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: UsernamePasswordInput!) {
    login(input: $input) {
      errors {
        field
        message
      }
      user {
        _id
        name
      }
    }
  }
`;
