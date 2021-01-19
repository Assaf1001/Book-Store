import React, { useEffect, useState } from "react";
import { filterBooksListAction } from "../../actions/booksListActions";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Filter = ({ dispatchBooksList, pageBooksList, priceRange }) => {
    const [priceRangeValue, setPriceRangeValue] = useState({});

    const [filterArray, setFilterArray] = useState([
        "",
        "All",
        "All",
        "All",
        {},
    ]);

    const setFilterOptions = (field, innerField) => {
        const filterOptionsArray = [];

        return pageBooksList.map((book) => {
            const filterString = innerField
                ? book[field][innerField]
                : book[field];

            if (!filterOptionsArray.includes(filterString)) {
                filterOptionsArray.push(filterString);
                return <option key={book._id}>{filterString}</option>;
            }
            return null;
        });
    };

    const onChangeDispatchBooks = (event, fliterArrayIndex) => {
        const newFilterArray = [...filterArray];
        newFilterArray[fliterArrayIndex] = event;
        setFilterArray(newFilterArray);
        dispatchBooksList(filterBooksListAction(pageBooksList, newFilterArray));
    };

    useEffect(() => {
        setPriceRangeValue(priceRange);
    }, [priceRange]);

    return (
        <div className="filter__container">
            <h2>Filter Search</h2>
            <div className="filter-form">
                <form>
                    <label htmlFor="title">Title</label>
                    <input
                        onInput={(event) =>
                            onChangeDispatchBooks(event.target.value, 0)
                        }
                        type="text"
                        id="title"
                    />
                    <label htmlFor="author">Author</label>
                    <select
                        onChange={(event) =>
                            onChangeDispatchBooks(event.target.value, 1)
                        }
                        id="author"
                    >
                        <option value="All">All</option>
                        {setFilterOptions("author")}
                    </select>
                    <label htmlFor="genre">Genre</label>
                    <select
                        onChange={(event) =>
                            onChangeDispatchBooks(event.target.value, 2)
                        }
                        id="genre"
                    >
                        <option value="All">All</option>
                        {setFilterOptions("category")}
                    </select>
                    <label htmlFor="language">Language</label>
                    <select
                        onChange={(event) =>
                            onChangeDispatchBooks(event.target.value, 3)
                        }
                        id="language"
                    >
                        <option value="All">All</option>
                        {setFilterOptions("details", "language")}
                    </select>
                    <label htmlFor="price-range">Price Range</label>
                    {Object.keys(priceRangeValue).length > 0 && (
                        <InputRange
                            maxValue={priceRange.max}
                            minValue={priceRange.min}
                            value={priceRangeValue}
                            onChange={(event) => {
                                setPriceRangeValue(event);
                                onChangeDispatchBooks(event, 4);
                            }}
                            formatLabel={(value) => `${value}$`}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};

export default Filter;
