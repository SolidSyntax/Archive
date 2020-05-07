import React from "react";
import Header from "./Header";
import gql from "graphql-tag";



function App({children}) {
    return (
        <div>
            <Header/>
            <main>{children}
            </main>
            <footer>
            </footer>
        </div>
    );
}


export default App;
