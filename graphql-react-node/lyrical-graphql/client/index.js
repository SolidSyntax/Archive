import React from 'react';
import ReactDOM from 'react-dom';
import SongList from "./components/SongList";
import App from './components/App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import {hashHistory, Router, Route, IndexRoute} from 'react-router';
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";



const client = new ApolloClient({});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={SongList}/>
                    <Route path="songs/new" component={SongCreate}/>
                    <Route path="songs/:id" component={SongDetail}/>
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(
    <Root/>,
    document.querySelector('#root')
);
