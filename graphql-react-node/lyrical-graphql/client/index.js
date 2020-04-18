import React from 'react';
import ReactDOM from 'react-dom';
import SongList from "./components/SongList";
import App from './components/App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import {hashHistory, Router, Route, IndexRoute} from 'react-router';
import SongCreate from "./components/SongCreate";



const client = new ApolloClient({});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={SongList}/>
                    <Route path="song/new" component={SongCreate}/>
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(
    <Root/>,
    document.querySelector('#root')
);
