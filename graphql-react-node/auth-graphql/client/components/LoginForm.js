import React, {useEffect, useRef, useState} from "react";
import GET_CURRENT_USER from "../queries/CurrentUser";
import {useMutation, useQuery} from "@apollo/react-hooks";
import AuthForm from "./AuthForm";
import LOGIN from "../mutations/Login";
import {hashHistory} from "react-router";

function LoginForm() {
    const {loading, error, data} = useQuery(GET_CURRENT_USER);
    const [loginMutation] = useMutation(LOGIN, {refetchQueries: [{query: GET_CURRENT_USER}]});
    const [errors, setErrors] = useState([]);


    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (data.user) {
            hashHistory.push('/dashboard')
        }

    });

    if (loading) return null;
    if (error) return `Error! ${error}`;


    const onSubmit = ({email, password}) => {
        loginMutation({
            variables: {
                email,
                password
            }
        }).catch(reason => {
                setErrors(reason.graphQLErrors.map(error => error.message));
            });
    }


    return (
        <main>
            <section>
                <header><h2>Login Form</h2></header>
                <AuthForm onSubmit={onSubmit} errors={errors}/>

            </section>
        </main>
    );
}


export default LoginForm;
