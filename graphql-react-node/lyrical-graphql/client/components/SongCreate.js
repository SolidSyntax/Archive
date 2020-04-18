import React, { useState } from 'react';
import gql from 'graphql-tag';
import {useMutation, useQuery} from "@apollo/react-hooks";
// https://www.apollographql.com/docs/react/data/mutations/
const CREATE_SONG = gql`
mutation AddSong($title: String){
  addSong(title: $title){
    id
    title
  }
}
`;



function SongCreate() {
    const [title, setTitle] = useState('');
    const [createSong, {createSongStataus}] = useMutation(CREATE_SONG);

    const onSubmit = (event) => {
        event.preventDefault();
        createSong({variables: {title: title}});
        setTitle('');
    }

    return (
        <div>
            <h3>Create a New Song</h3>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Song</legend>

                    <label>Title</label>
                    <input
                        onChange={event => setTitle(event.target.value)}
                        value={title}
                    />

                </fieldset>

            </form>
        </div>
    );
}


export default SongCreate;
