import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { AddItemsContext } from "../../context/AddItemsContext";
import { logOutAction } from "../../actions/loginActions";
import { useHistory } from "react-router-dom";
import { deleteUserOnCookie } from "../../cookies/cookies";
import { deleteAccount } from "../../server/auth";

import MyAccountMenu from "./MyAccountMenu";
import Greeting from "./accountItems/Greeting";
import AdminModal from "../admin/AdminModal";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const MyAccountPage = () => {
    const { userData, dispatchUserData } = useContext(LoginContext);
    const {
        isModalActive,
        toggleModal,
        modalMessage,
        isChangeDetails,
    } = useContext(AddItemsContext);

    const [activeComponent, setActiveComponent] = useState("");
    const [isDesktopMode, setIsDesktopMode] = useState(false);

    const history = useHistory();

    const onCangeDesktopMode = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 1024) setIsDesktopMode(false);
        else setIsDesktopMode(true);
    };

    window.addEventListener("resize", onCangeDesktopMode);

    const onClickDeleteAccount = () => {
        deleteAccount(userData.token)
            .then(() => {
                toggleModal();
                dispatchUserData(logOutAction());
                deleteUserOnCookie();
                history.push("/home");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        onCangeDesktopMode();
    }, [isDesktopMode]);

    useEffect(() => {
        let isComponentExist = true;

        if (isComponentExist) {
            setActiveComponent(
                <Greeting setActiveComponent={setActiveComponent} />
            );
        }

        return () => (isComponentExist = false);
    }, []);

    return (
        <div className="main__container">
            {isModalActive && (
                <div onClick={toggleModal} className="blur-background"></div>
            )}
            {isModalActive && (
                <AdminModal
                    message={modalMessage}
                    closeButton={isChangeDetails ? "CLOSE" : "NO"}
                >
                    {!isChangeDetails && (
                        <button onClick={onClickDeleteAccount}>YES</button>
                    )}
                </AdminModal>
            )}
            <div className="my-account-page__content center">
                {isDesktopMode ? (
                    <MyAccountMenu
                        setActiveComponent={setActiveComponent}
                        isDesktopMode={isDesktopMode}
                    />
                ) : (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <h2>My Account Menu</h2>
                        </AccordionSummary>
                        <MyAccountMenu
                            setActiveComponent={setActiveComponent}
                            isDesktopMode={isDesktopMode}
                        />
                    </Accordion>
                )}

                <div className="content__container">{activeComponent}</div>
            </div>
        </div>
    );
};

export default MyAccountPage;
