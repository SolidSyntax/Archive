import gql from "graphql-tag";

const GET_CURRENT_USER = gql`
{
  user{
    id
    email
  }
}
`;
export default GET_CURRENT_USER;
