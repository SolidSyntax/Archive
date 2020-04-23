import React from 'react';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Link} from "react-router";
import GET_SONGS from "../queries/fetchSongs";
import gql from "graphql-tag";

// https://www.apollographql.com/docs/react/data/queries/#executing-a-query

const DELETE_SONG = gql`
mutation DeleteSong($id: ID){
  deleteSong(id: $id){
    id
  }
}
`;

function SongList() {
    const {loading, error, data} = useQuery(GET_SONGS);
    const [deleteSong] = useMutation(DELETE_SONG);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const renderSongs = () => {
        return (
            data.songs.map(({id,title})=> (
                <li key={id}>
                    <button onClick={() => deleteSong({variables: {id}})}>Delete</button>
                    <span>{title}</span>
                </li>
            ))
        )
    }

    return (
        <div>
            <ul>
                {renderSongs()}
            </ul>

            <Link to="/songs/new">
                New Song
            </Link>
        </div>
    );
}


export default SongList;
