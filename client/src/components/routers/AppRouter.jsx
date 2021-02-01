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
import PaymentPage from "../cart/PaymentPage";
import AddItemsContextProvider from "../../context/AddItemsContext";
import AddBookPage from "../admin/AddBook";
import AdminRoute from "./AdminRoute";

const AppRouter = () => (
    <BrowserRouter>
        <LoginContextProvider>
            <LoginBar />
            <Header />
            <AddItemsContextProvider>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/home" />
                    </Route>

                    {/* <AdminRoute path="/addBook" component={AddBookPage} /> */}

                    <Route path="/home" component={HomePage} />
                    <Route path="/genres/:genre" component={GenrePage} />
                    <Route path="/book/:id" component={BookPage} />
                    <Route
                        path="/searchResult/:result"
                        component={SearchResultPage}
                    />
                    <LoginRoute path="/login" component={LoginPage} />

                    <Route path="/contactUs" />
                    <Route path="/help" />

                    <PrivateRoute path="/myAccount" component={MyAccountPage} />

                    <Route path="/bestSellers" />
                    <Route path="/newReleases" />
                    <Route path="/coomingSoon" />

                    <PrivateRoute path="/wishList" component={WishListPage} />
                    <PrivateRoute path="/cart" component={CartPage} />
                    <PrivateRoute path="/payment" component={PaymentPage} />

                    <Route path="*" component={PageNotFound} />
                </Switch>
            </AddItemsContextProvider>
            <Footer />
        </LoginContextProvider>
    </BrowserRouter>
);

export default AppRouter;
