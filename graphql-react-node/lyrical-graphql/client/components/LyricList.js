import React from 'react';
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";

const LIKE_LYRIC = gql`
mutation LikeLyric($id: ID){
  likeLyric(id: $id){
    id
    likes 
  }
}
`;

function LyricList({lyrics}) {
    const [likeLyric] = useMutation(LIKE_LYRIC);

    const like = (id, likes) => {
        likeLyric({
            variables: {id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    likes: likes +1,
                    __typename: "LyricType"
                }
            }
        });
    }

    const renderLyrics = () => {
        return (
            lyrics.map(({id, content, likes}) => (
                <li key={id}>
                    <button onClick={() => like(id,likes)}>Like ({likes})</button>
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
        </div>
    );
}


export default LyricList;
