import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
// https://www.apollographql.com/docs/react/data/mutations/
const ADD_LYRIC = gql`
mutation AddLyric($content: String, $songId: ID){
  addLyricToSong(content: $content, songId: $songId){
    id
    lyrics {
        id
        content
    }
  }
}
`;


function LyricCreate({songId}) {
    const [lyric, setLyric] = useState('');
    const [addLyric] = useMutation(ADD_LYRIC);

    const onSubmit = (event) => {
        event.preventDefault();
        addLyric({
            variables: {
                songId: songId,
                content: lyric
            }
        });
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
