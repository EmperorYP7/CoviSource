import { gql } from "@apollo/client";

export const MY_PROVIDER = gql`
  query MyProvider {
    myProvider {
      _id
      slug
    }
  }
`;
