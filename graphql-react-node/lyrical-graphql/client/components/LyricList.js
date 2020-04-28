import React from 'react';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Link} from "react-router";
import GET_SONGS from "../queries/fetchSongs";
import gql from "graphql-tag";


function LyricList({lyrics}) {

    const renderLyrics = () => {
        return (
            lyrics.map(({id,content})=> (
                <li key={id}>
                        {content}
                </li>
            ))
        )
    }

    return (
        <div>
            <ul>
                {renderLyrics()}
            </ul>

            <Link to="/songs/new">
                New Song
            </Link>
        </div>
    );
}


export default LyricList;
