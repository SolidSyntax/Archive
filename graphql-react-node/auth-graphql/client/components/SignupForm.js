import React, {useEffect, useRef, useState} from "react";
import GET_CURRENT_USER from "../queries/CurrentUser";
import {useMutation, useQuery} from "@apollo/react-hooks";
import AuthForm from "./AuthForm";
import {hashHistory} from "react-router";
import SIGNUP from "../mutations/Signup";

function SignupForm() {
    const {loading, error, data} = useQuery(GET_CURRENT_USER);
    const [signupMutation] = useMutation(SIGNUP, {refetchQueries: [{query: GET_CURRENT_USER}]});
    const [errors, setErrors] = useState([]);

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (data.user) {
            hashHistory.push(('/dashboard'))
        }

    });

    if (loading) return null;
    if (error) return `Error! ${error}`;
    const onSubmit = ({email, password}) => {
        signupMutation({
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
                <header><h2>Signup Form</h2></header>
                <AuthForm onSubmit={onSubmit} errors={errors}/>

            </section>
        </main>
    );
}


export default SignupForm;
