import React, { useContext, useEffect, useReducer, useState } from "react";
import { setBooksListAction } from "../../actions/booksListActions";
import booksListReducer, {
    initialBooksListState,
} from "../../reducers/booksListReducer";
import { getBooksByFieldAndValue, getDicountedBooks } from "../../server/books";
import CustomerInfo from "../customerInfo/CustomerInfo";

import BooksCarousel from "../carousels/booksCarousel/BooksCarousel";
import ImagesCarousel from "../carousels/imagesCarousel/ImagesCarousel";

import HomePageBox from "./HomePageBox";
import { AddItemsContext } from "../../context/AddItemsContext";

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
                            <HomePageBox url={"/"}></HomePageBox>
                        </div>
                    </div>

                    <div className="home-page__content--row">
                        <div className="content-left">
                            <HomePageBox
                                class={"box3"}
                                header={"MANGA"}
                                url={"/"}
                            >
                                <p className="text">
                                    <b>What is manga?</b> Manga is an umbrella
                                    term for a wide variety of comic books and
                                    graphic novels originally produced and
                                    published in Japan. Unlike American comic
                                    books, which are usually printed in full
                                    color, Japanese manga is almost always black
                                    and white. Full-color prints are often only
                                    used for special releases. <br />
                                    <br />
                                    Japanese manga is read right-to-left rather
                                    than left-to-right, which is the norm for
                                    English language publications. This can take
                                    some getting used to if you have only ever
                                    read English publications as it often feels
                                    like you’re "reading backwards," but you
                                    will hardly notice once you’ve practiced
                                    enough. <br /> <br /> In Japan, a lot of
                                    manga are released on a monthly or a weekly
                                    chapter-by-chapter basis through manga
                                    magazines such as Weekly Shōnen Jump, which
                                    has been in circulation since 1968. If a
                                    series is popular enough, its chapters are
                                    then collected and published into volumes
                                    called tankōbon volumes, which usually
                                    feature a few chapters of the overall story.
                                    <br />
                                    <br />
                                    Most manga series are long-running and can
                                    span multiple volumes. This is something to
                                    keep in mind when starting a new series as
                                    it is imperative you read the volumes in the
                                    correct order. This might be easier for
                                    small series, such as Naoko Takeuchi's
                                    Sailor Moon, which only has 12 volumes,
                                    versus longer-running series such as Akira
                                    Toriyama's Dragon Ball, which has 42
                                    volumes.
                                </p>
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
