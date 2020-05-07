import React from 'react';
import ReactDOM from 'react-dom';
import {InMemoryCache} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import {ApolloProvider} from '@apollo/react-hooks';
import {hashHistory, Route, Router} from 'react-router';
import App from "./components/App";
import {HttpLink} from "apollo-link-http";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id
});

const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'same-origin'
});

const client = new ApolloClient({
    cache,
    link
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="login" component={LoginForm}/>
                    <Route path="signup" component={SignupForm}/>
                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(
    <Root/>,
    document.querySelector('#root')
);
