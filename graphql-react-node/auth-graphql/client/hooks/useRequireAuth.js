import {useQuery} from "@apollo/react-hooks";
import GET_CURRENT_USER from "../queries/CurrentUser";
import {useEffect, useRef} from "react";
import {hashHistory} from "react-router";

export function useRequireAuth(props) {
    const {loading, error, data} = useQuery(GET_CURRENT_USER);

    useEffect(() => {
        if (!loading && !data.user) {
            hashHistory.push('/login')
        }

    });
}
