import gql from "graphql-tag";

const GET_SONGS = gql`
{
  songs{
    id
    title
  }
}
`;
export default GET_SONGS;
