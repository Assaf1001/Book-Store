import React, { useContext, useEffect, useReducer } from "react";
import { setBooksListAction } from "../../actions/booksListActions";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { getBooksByFieldAndValue, getDicountedBooks } from "../../server/books";
import CustomerInfo from "./customerInfo/CustomerInfo";

import BooksCarousel from "../carousels/booksCarousel/BooksCarousel";
import ImagesCarousel from "../carousels/imagesCarousel/ImagesCarousel";

import HomePageBox from "./HomePageBox";
import { AddItemsContext } from "../../context/AddItemsContext";
import MangaText from "./MangaText";

const HomePage = () => {
    const { isItemAdded } = useContext(AddItemsContext);

    const [booksList, dispatchBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );
    const [discountedBooksList, dispatchDicountedBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );
    const responsive = [
        {
            largeDesktop: {
                breakpoint: { max: 8000, min: 1440 },
                items: 4,
                slidesToSlide: 4,
            },
            desktop: {
                breakpoint: { max: 1440, min: 1024 },
                items: 4,
                slidesToSlide: 4,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 3,
                slidesToSlide: 3,
            },
            smallTablet: {
                breakpoint: { max: 650, min: 464 },
                items: 3,
                slidesToSlide: 3,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 2,
                slidesToSlide: 2,
            },
        },
        {
            largeDesktop: {
                breakpoint: { max: 8000, min: 1440 },
                items: 6,
                slidesToSlide: 6,
            },
            desktop: {
                breakpoint: { max: 1440, min: 1024 },
                items: 6,
                slidesToSlide: 6,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 4,
                slidesToSlide: 4,
            },
            smallTablet: {
                breakpoint: { max: 650, min: 464 },
                items: 3,
                slidesToSlide: 3,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 2,
                slidesToSlide: 2,
            },
        },
    ];

    useEffect(() => {
        getBooksByFieldAndValue("author", "hajime isayama")
            .then((booksData) => {
                dispatchBooksList(setBooksListAction(booksData));
            })
            .catch((err) => {
                console.log(err.message);
            });

        getDicountedBooks()
            .then((booksData) => {
                dispatchDicountedBooksList(setBooksListAction(booksData));
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="home-page__container">
            <div className="home-page__content">
                <ImagesCarousel />
            </div>
            <div className="home-page__content center">
                <div className="main-middle">
                    <div className="home-page__content--row">
                        <div className="content-left">
                            <HomePageBox
                                class={"carousel__container"}
                                header={"BEST OF 2020"}
                                url={"/"}
                            >
                                <BooksCarousel
                                    responsive={responsive[0]}
                                    books={booksList}
                                />
                            </HomePageBox>
                        </div>
                        <div className="content-right">
                            <HomePageBox
                                header={"POPULAR AUTHORS"}
                                url={"/"}
                            ></HomePageBox>
                        </div>
                    </div>

                    <div className="home-page__content--row">
                        <div className="content-left">
                            <HomePageBox
                                class={"box3"}
                                header={"MANGA"}
                                url={"/"}
                            >
                                <MangaText />
                            </HomePageBox>
                        </div>
                        <div className="content-right">
                            <HomePageBox url={"/"}></HomePageBox>
                        </div>
                    </div>
                </div>
            </div>
            <div className="on-sale__container">
                <HomePageBox
                    class={"carousel__container on-sale center"}
                    header={"ON SALE"}
                    url={"/"}
                >
                    <BooksCarousel
                        responsive={responsive[1]}
                        books={discountedBooksList}
                    />
                </HomePageBox>
            </div>
            <CustomerInfo />
            {isItemAdded && <div className="blur-background"></div>}
        </div>
    );
};

export default HomePage;
