import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import {hashHistory, Link} from "react-router";
import GET_SONGS from "../queries/fetchSongs";
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
    const [createSong] = useMutation(CREATE_SONG,
        {
            update(cache, {data: {addSong}}) { // does not seem to work
                const {songs} = cache.readQuery({query: GET_SONGS});
                cache.writeQuery({
                    query: GET_SONGS,
                    data: {songs: songs.concat([addSong])},
                });
            }
        });

    const onSubmit = (event) => {
        event.preventDefault();
        createSong({variables: {title: title}})
            .then(() => hashHistory.push(('/')));
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
            <Link to="/">
                Back
            </Link>
        </div>
    );
}


export default SongCreate;
