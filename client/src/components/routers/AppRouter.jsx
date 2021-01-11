import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import LoginBar from "../main/header/LoginBar";
import Header from "../main/header/Header";
import Footer from "../main/Footer";
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
            <LoginBar />
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={HomePage} />
                <Route path="/contactUs" />
                <Route path="/help" />

                <PrivateRoute path="/myAccount" component={MyAccountPage} />
                <LoginRoute path="/login" component={LoginPage} />

                <Route path="/bestSellers" />
                <Route path="/newReleases" />
                <Route path="/coomingSoon" />

                <PrivateRoute path="/wishList" component={WishListPage} />
                <PrivateRoute path="/cart" />
                <Route path="*" component={PageNotFound} />
            </Switch>
            <Footer />
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter;
