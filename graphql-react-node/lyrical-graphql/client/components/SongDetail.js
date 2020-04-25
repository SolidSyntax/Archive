import React from 'react';
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";


function SongDetail({id}) {
    const { loading, error, data } = useQuery(GET_SONG, {
        variables: { id },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;


    return (
        <div>
            <h3>Song Detail {data.song.title}</h3>
        </div>
    );
}


export default SongDetail;
