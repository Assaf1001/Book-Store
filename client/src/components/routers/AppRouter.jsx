import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "../main/header/Header";
import HomePage from "../home/HomePage";
import LoginPage from "../login/LoginPage";
import PageNotFound from "../main/PageNotFound";
import LoginContextProvider from "../../context/LoginContext";
import PrivateRoute from "./PrivateRoute";
import WishListPage from "../wishList/WishListPage";
import MyAccountPage from "../account/MyAccountPage";
import LoginRoute from "./LoginRoute";

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={HomePage} />
                {/* <Route path="/login" component={LoginPage} /> */}
                <LoginRoute path="/login" component={LoginPage} />
                <PrivateRoute path="/wishList" component={WishListPage} />
                <PrivateRoute path="/myAccount" component={MyAccountPage} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter;
