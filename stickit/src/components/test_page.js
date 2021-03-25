import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {AppContext} from "./context/user_context";

//Just a test page for navigation testing with the menu bar
function TestPage() {
    const { userID } = useContext(AppContext);

    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div>

        </div>
    );

}

export default TestPage