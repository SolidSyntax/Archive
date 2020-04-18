import React, { useState } from 'react';
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";
// https://www.apollographql.com/docs/react/data/queries/#executing-a-query
const GET_SONGS = gql`
{
  songs{
    id,
    title
  }
}
`;


function SongCreate() {
    const [title, setTitle] = useState('');
    return (
        <div>
            <h3>Create a New Song</h3>
            <form>
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
