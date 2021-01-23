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
import BookPage from "../book/BookPage";
import SearchResultPage from "../searchResult/SearchResultPage";
import GenrePage from "../genres/GenrePage";
import CartPage from "../cart/CartPage";

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

                <Route path="/genres/:genre" component={GenrePage} />
                <Route path="/book/:id" component={BookPage} />
                <Route
                    path="/searchResult/:result"
                    component={SearchResultPage}
                />

                <Route path="/bestSellers" />
                <Route path="/newReleases" />
                <Route path="/coomingSoon" />

                <PrivateRoute path="/wishList" component={WishListPage} />
                <PrivateRoute path="/cart" component={CartPage} />
                <Route path="*" component={PageNotFound} />
            </Switch>
            <Footer />
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter;
