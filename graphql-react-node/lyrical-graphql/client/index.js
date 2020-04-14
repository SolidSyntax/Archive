import React from 'react';
import ReactDOM from 'react-dom';
import SongList from "./components/SongList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <SongList/>
        </ApolloProvider>
    );
};

ReactDOM.render(
    <Root/>,
    document.querySelector('#root')
);
