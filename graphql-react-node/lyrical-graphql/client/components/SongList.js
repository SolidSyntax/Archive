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
    const {loading, error, data, refetch} = useQuery(GET_SONGS);
    const [deleteSong] = useMutation(DELETE_SONG);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const deleteAndRefresh = id => {
        deleteSong({variables: {id}});
        refetch();
    }

    const renderSongs = () => {
        return (
            data.songs.map(({id,title})=> (
                <li key={id}>
                    <button onClick={() => deleteAndRefresh(id)}>Delete</button>
                    <Link to={`/songs/${id}`}>
                        {title}
                    </Link>
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
