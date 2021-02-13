import React, { useContext, useEffect, useReducer } from "react";
import { AddItemsContext } from "../../context/AddItemsContext";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { setBooksListAction } from "../../actions/booksListActions";
import { getBooksByFieldAndValue, getDicountedBooks } from "../../server/books";

import CustomerInfo from "./customerInfo/CustomerInfo";
import BooksCarousel from "../carousels/booksCarousel/BooksCarousel";
import ImagesCarousel from "../carousels/imagesCarousel/ImagesCarousel";
import HomePageBox from "./HomePageBox";

import MangaText from "./MangaText";
import box4Background from "../../images/HanterXHanter.jpg";
import PopularManga from "./PopularManga";

const HomePage = () => {
    const {
        isItemAdded,
        setIsAddedToWishList,
        toggleModal,
        isModalActive,
    } = useContext(AddItemsContext);

    const [booksList, dispatchBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );
    const [discountedBooksList, dispatchDicountedBooksList] = useReducer(
        booksListReducer,
        initialBooksListState
    );

    // $mobile: 668px;
    // $tablet: 1024px;
    const responsive = [
        {
            desktop: {
                breakpoint: { max: 8000, min: 1024 },
                items: 4,
                slidesToSlide: 4,
            },
            tablet: {
                breakpoint: { max: 1024, min: 668 },
                items: 4,
                slidesToSlide: 4,
            },
            smallTablet: {
                breakpoint: { max: 720, min: 520 },
                items: 3,
                slidesToSlide: 3,
            },
            mobile: {
                breakpoint: { max: 520, min: 360 },
                items: 2,
                slidesToSlide: 2,
            },
            smallMobile: {
                breakpoint: { max: 360, min: 0 },
                items: 1,
                slidesToSlide: 1,
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
        let isComponentExist = true;

        if (isComponentExist) {
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
        }

        return () => (isComponentExist = false);
    }, [booksList.length]);

    return (
        <div className="home-page__container">
            {(isItemAdded || isModalActive) && (
                <div
                    onClick={() => {
                        if (isModalActive) toggleModal();
                        else setIsAddedToWishList(false);
                    }}
                    className="blur-background"
                ></div>
            )}
            <div className="home-page__content">
                <ImagesCarousel />
            </div>
            <div className="home-page__content center">
                <div className="main-middle">
                    <div className="home-page__content--row">
                        <div className="content-left">
                            <HomePageBox
                                class={"carousel__container"}
                                header={"BEST OF HAJIME ISAYAMA"}
                                showButton={true}
                                url={"/searchResult/hajime isayama"}
                            >
                                <BooksCarousel
                                    responsive={responsive[0]}
                                    books={booksList}
                                />
                            </HomePageBox>
                        </div>
                        <div className="content-right">
                            <HomePageBox
                                header={"POPULAR MANGA"}
                                class={"box2"}
                                url={"/"}
                            >
                                <PopularManga />
                            </HomePageBox>
                        </div>
                    </div>

                    <div className="home-page__content--row">
                        <div className="content-left">
                            <HomePageBox
                                class={"box3"}
                                header={"MANGA"}
                                showButton={true}
                                url={"/"}
                            >
                                <MangaText />
                            </HomePageBox>
                        </div>
                        <div className="content-right">
                            <HomePageBox
                                class={"box4"}
                                background={box4Background}
                                header={"MANAGE YOUR ACCOUNT"}
                                url={"/myAccount"}
                                showButton={true}
                                button={"MY ACCOUNT"}
                            ></HomePageBox>
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
        </div>
    );
};

export default HomePage;
