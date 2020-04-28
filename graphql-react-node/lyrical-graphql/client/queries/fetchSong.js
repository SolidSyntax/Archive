import gql from "graphql-tag";

const GET_SONG = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default GET_SONG;
