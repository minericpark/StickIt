import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import {AppContext} from "./user_context";

function TestPage() {
    const { userID } = useContext(AppContext);

    // Attempting to navigate to testpage without being logged in
    if (userID === null) {
        return <Redirect to="/" />;
    }

    return (
        <div>

        </div>
    );

}

export default TestPage