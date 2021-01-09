import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "../main/header/Header";
import HomePage from "../home/HomePage";
import LoginPage from "../login/LoginPage";
import PageNotFound from "../main/PageNotFound";

const AppRouter = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/" exact>
                <Redirect to="/home" />
            </Route>
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
