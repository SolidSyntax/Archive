import React, {useState} from "react";
import GET_CURRENT_USER from "../queries/CurrentUser";
import {useMutation} from "@apollo/react-hooks";
import AuthForm from "./AuthForm";
import LOGIN from "../mutations/Login";
import {hashHistory} from "react-router";

function LoginForm() {
    const [loginMutation] = useMutation(LOGIN, {refetchQueries: [{query: GET_CURRENT_USER}]});
    const [errors, setErrors] = useState([]);

    const onSubmit = ({email, password}) => {
        loginMutation({
            variables: {
                email,
                password
            }
        }).then(() => hashHistory.push(('/')))
            .catch(reason => {
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
