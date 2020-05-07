import React from "react";
import GET_CURRENT_USER from "../queries/CurrentUser";
import {useMutation, useQuery} from "@apollo/react-hooks";
import Link from "react-router/lib/Link";
import LOGOUT from "../mutations/Logout";
import {hashHistory} from "react-router";

function Dashboard() {
    const {loading, error, data} = useQuery(GET_CURRENT_USER);

    if (loading) return null;
    if (error) return `Error! ${error}`;

    if (!data.user) {
        hashHistory.push('/login')
    }

    return (
        <main><h3>Welcome {JSON.stringify(data)}</h3></main>
    );
}


export default Dashboard;
