import React from "react";
import GET_CURRENT_USER from "../queries/CurrentUser";
import {useQuery} from "@apollo/react-hooks";
import {useRequireAuth} from "../hooks/useRequireAuth";

function Dashboard() {
    useRequireAuth();
    const {loading, error, data} = useQuery(GET_CURRENT_USER);

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <main><h3>Welcome {JSON.stringify(data)}</h3></main>
    );
}


export default Dashboard;
