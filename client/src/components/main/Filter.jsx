import React, { useEffect, useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterForm from "./FilterForm";

const Filter = ({ dispatchBooksList, pageBooksList, priceRange }) => {
    const [isDesktopMode, setIsDesktopMode] = useState(false);

    const onCangeDesktopMode = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 1024) setIsDesktopMode(false);
        else setIsDesktopMode(true);
    };

    window.addEventListener("resize", onCangeDesktopMode);

    useEffect(() => {
        onCangeDesktopMode();
    }, [isDesktopMode]);

    return (
        <div className="filter__container">
            {isDesktopMode ? (
                <div>
                    <h2>Filter Search</h2>
                    <FilterForm
                        dispatchBooksList={dispatchBooksList}
                        pageBooksList={pageBooksList}
                        priceRange={priceRange}
                    />
                </div>
            ) : (
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <h2>Filter Search</h2>
                    </AccordionSummary>
                    <FilterForm
                        dispatchBooksList={dispatchBooksList}
                        pageBooksList={pageBooksList}
                        priceRange={priceRange}
                    />
                </Accordion>
            )}
        </div>
    );
};

export default Filter;
