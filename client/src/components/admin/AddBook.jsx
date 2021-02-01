import React, { useState } from "react";

const AddBookPage = () => {
    const [checkboxClass, setCheckboxClass] = useState("checkbox");
    const [isDiscountDisabled, setIsDiscountDisabled] = useState(true);

    const onClickCheckboxActive = () => {
        if (checkboxClass === "checkbox") {
            setCheckboxClass("checkbox active");
            setIsDiscountDisabled(false);
        } else {
            setCheckboxClass("checkbox");
            setIsDiscountDisabled(true);
        }
    };

    return (
        <div className="add-book__container center">
            <h1>Add book</h1>
            <form className="add-book__form">
                <div className="part1">
                    <label htmlFor="title">TITLE</label>
                    <input type="text" id="title" />
                    <label htmlFor="author">AUTHOR</label>
                    <input type="text" id="author" />
                    <label htmlFor="catetory">CATEGORY</label>
                    <input type="text" id="catetory" />
                    <label htmlFor="price">PRICE</label>
                    <input type="number" id="price" />

                    <div className="discount">
                        <div
                            onClick={onClickCheckboxActive}
                            className={checkboxClass}
                        ></div>
                        <label htmlFor="discount">DISCOUNT</label>
                    </div>
                    <label htmlFor="discountInPercentage">
                        DISCOUNT IN PERCENTAGE
                    </label>
                    <input
                        disabled={isDiscountDisabled}
                        type="number"
                        id="discountInPercentage"
                    />
                </div>

                <div className="part2">
                    <label htmlFor="year">YEAR</label>
                    <input type="number" id="year" />
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text" id="isbn" />
                    <label htmlFor="pages">NUMBER OF PAGES</label>
                    <input type="text" id="pages" />
                    <label htmlFor="publisher">PUBLISHER</label>
                    <input type="text" id="publisher" />
                    <label htmlFor="bestSellersRank">BEST SELLERS RANK</label>
                    <input type="text" id="bestSellersRank" />
                    <label htmlFor="language">LANGUAGE</label>
                    <input type="text" id="language" />
                </div>

                <div className="part3">
                    <label htmlFor="image">IMAGE URL</label>
                    <input type="text" id="imgae" />
                    <label htmlFor="desciption">DESCRIPTION</label>
                    <textarea id="desciptiion" />
                    <button type="submit">ADD BOOK</button>
                </div>
            </form>
        </div>
    );
};

export default AddBookPage;

// {
//     image: { type: String, required: true },
//     title: { type: String, required: true, unique: true },
//     author: { type: String, required: true },
//     price: { type: Number, min: 1, required: true },
//     discountInPercentage: { type: Number, min: 1 },
//     category: { type: String },
//     details: {
//         year: { type: Number },
//         isbn: { type: String, unique: true },
//         pages: { type: Number, min: 1 },
//         publisher: { type: String },
//         bestSellersRank: { type: String },
//         language: { type: String },
//         description: { type: String },
//     },
// },
