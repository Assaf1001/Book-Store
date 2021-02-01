import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const AdminRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(LoginContext);

    return (
        <Route
            {...rest}
            component={(props) => {
                return !userData.isAdmin ? (
                    <Redirect to="/home" />
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
};

export default AdminRoute;