import React, { useState } from 'react';
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";
// https://www.apollographql.com/docs/react/data/queries/#executing-a-query
const GET_SONGS = gql`
{
  songs{
    title
  }
}
`;


function SongList() {
    const { loading, error, data } = useQuery(GET_SONGS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            {data.songs.map(song => (
                <div key={song.title}>
                    {song.title}
                </div>
            ))}
        </div>
    );
}


export default SongList;
