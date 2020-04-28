import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import GET_SONG from "../queries/fetchSong";
import {Link} from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";


function SongDetail({params}) {
    const { loading, error, data } = useQuery(GET_SONG, {
        variables: { id: params.id },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;


    return (
        <div>
            <h3>{data.song.title}</h3>
            <LyricList lyrics={data.song.lyrics}/>
            <LyricCreate songId={data.song.id}/>
            <Link to="/">
                Back
            </Link>
        </div>
    );
}


export default SongDetail;
