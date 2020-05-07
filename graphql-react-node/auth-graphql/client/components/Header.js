import React from "react";
import GET_CURRENT_USER from "../queries/CurrentUser";
import {useMutation, useQuery} from "@apollo/react-hooks";
import Link from "react-router/lib/Link";
import LOGOUT from "../mutations/Logout";

function Header() {
    const {loading, error, data} = useQuery(GET_CURRENT_USER);
    const [logoutMutation] = useMutation(LOGOUT, {});

    if (loading) return null;
    if (error) return `Error! ${error}`;


    const logout = () => {
        logoutMutation({});
    }

    const renderButtons = () => {
        if (data.user) {
            return (
                <ul>
                    <li><a href={""} onClick={logout}>Logout</a></li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )
        }
    }


    return (
        <header>
            <nav>
                <Link to="/">
                    Home
                </Link>
                {renderButtons()}
            </nav>
        </header>
    );
}


export default Header;
