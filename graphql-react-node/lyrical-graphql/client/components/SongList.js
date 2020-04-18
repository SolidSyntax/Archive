import React, { useState } from 'react';
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";
// https://www.apollographql.com/docs/react/data/queries/#executing-a-query
const GET_SONGS = gql`
{
  songs{
    id
    title
  }
}
`;


function SongList() {
    const { loading, error, data } = useQuery(GET_SONGS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const renderSongs = () => {
        return (
            data.songs.map(song => (
                <li key={song.id}>
                    {song.title}
                </li>
            ))
        )
    }

    return (
        <div>
            {renderSongs()}
        </div>
    );
}


export default SongList;
