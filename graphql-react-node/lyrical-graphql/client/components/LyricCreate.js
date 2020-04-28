import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import {hashHistory, Link} from "react-router";
import GET_SONGS from "../queries/fetchSongs";
import GET_SONG from "../queries/fetchSong";
// https://www.apollographql.com/docs/react/data/mutations/
const ADD_LYRIC = gql`
mutation AddLyric($content: String, $songId: ID){
  addLyricToSong(content: $content, songId: $songId){
    id
    lyrics {
        content
    }
  }
}
`;


function LyricCreate({songId}) {
    const [lyric, setLyric] = useState('');
    const [addLyric] = useMutation(ADD_LYRIC,
        {
            update(cache, {data: {addLyricToSong}}) {
                // const {song} = cache.readQuery({query: GET_SONG});
                cache.writeQuery({
                    query: GET_SONG,
                    data: {lyrics: addLyric.lyrics},
                });
            }
        });

    const onSubmit = (event) => {
        event.preventDefault();
        addLyric({variables: {
            songId: songId,
                content: lyric
        }});
        setLyric('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                    <label>Add a lyric</label>
                    <input
                        onChange={event => setLyric(event.target.value)}
                        value={lyric}
                    />
            </form>
        </div>
    );
}


export default LyricCreate;
