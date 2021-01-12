import React, { useEffect, useReducer } from "react";
import { setBooksAction } from "../../actions/booksActions";
import booksReducer, { initialBooksState } from "../../reducers/booksReducer";
import { getBooksFromDB } from "../../server/DB";
import CustomerInfo from "../customerInfo/CustomerInfo";

import BooksCarousel from "../carousels/booksCarousel/BooksCarousel";
import ImagesCarousel from "../carousels/imagesCarousel/ImagesCarousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
    const [books, dispatchBooks] = useReducer(booksReducer, initialBooksState);
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
                items: 8,
                slidesToSlide: 8,
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
    const title = { best: "BEST OF 2020", sale: "MANGA SALE" };

    useEffect(() => {
        getBooksFromDB()
            .then((booksData) => {
                dispatchBooks(setBooksAction(booksData));
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
            <div className="home-page__content center middle">
                <div className="home-page__content--row">
                    <div className="carousel__container">
                        <h2>BEST OF 2020</h2>
                        <BooksCarousel
                            responsive={responsive[0]}
                            books={books}
                        />
                        <button className="view-more__button">
                            VIEW MORE <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="home-page__content--row-right">
                    {/* <div className="carousel__container section2">
                        <h2>2</h2>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Rem velit dolorum distinctio ea quos quo qui
                            magnam hic quod beatae nulla aperiam saepe, vero ex
                            porro recusandae expedita dicta magni cumque
                            molestiae possimus? Animi, corporis. Atque totam
                            rerum dolor porro! Harum nostrum delectus neque
                            optio recusandae iste quae et nobis incidunt
                            tenetur, dicta totam fugit corporis, sit porro quasi
                            dignissimos dolorum repellat modi eligendi, ipsum
                            temporibus officia eius. Ex animi repellendus ut!
                            Consectetur laboriosam voluptatibus, rerum,
                            distinctio accusamus maiores, hic corporis et a
                            pariatur perferendis voluptatum facilis quas. Rerum
                            hic velit repudiandae blanditiis possimus fugiat
                            voluptas sit consequatur commodi porro.
                        </div>
                        <button className="view-more__button">
                            VIEW MORE <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div> */}
                </div>
                <div className="home-page__content--row">
                    <div className="carousel__container section2">
                        <h2>MANGA</h2>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Rem velit dolorum distinctio ea quos quo qui
                            magnam hic quod beatae nulla aperiam saepe, vero ex
                            porro recusandae expedita dicta magni cumque
                            molestiae possimus? Animi, corporis. Atque totam
                            rerum dolor porro! Harum nostrum delectus neque
                            optio recusandae iste quae et nobis incidunt
                            tenetur, dicta totam fugit corporis, sit porro quasi
                            dignissimos dolorum repellat modi eligendi, ipsum
                            temporibus officia eius. Ex animi repellendus ut!
                            Consectetur laboriosam voluptatibus, rerum,
                            distinctio accusamus maiores, hic corporis et a
                            pariatur perferendis voluptatum facilis quas. Rerum
                            hic velit repudiandae blanditiis possimus fugiat
                            voluptas sit consequatur commodi porro.
                        </div>
                        <button className="view-more__button">
                            VIEW MORE <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="home-page__content--row-right">
                    {/* <div className="carousel__container section2">
                        <h2>4</h2>
                        <div>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Rem velit dolorum distinctio ea quos quo qui
                            magnam hic quod beatae nulla aperiam saepe, vero ex
                            porro recusandae expedita dicta magni cumque
                            molestiae possimus? Animi, corporis. Atque totam
                            rerum dolor porro! Harum nostrum delectus neque
                            optio recusandae iste quae et nobis incidunt
                            tenetur, dicta totam fugit corporis, sit porro quasi
                            dignissimos dolorum repellat modi eligendi, ipsum
                            temporibus officia eius. Ex animi repellendus ut!
                            Consectetur laboriosam voluptatibus, rerum,
                            distinctio accusamus maiores, hic corporis et a
                            pariatur perferendis voluptatum facilis quas. Rerum
                            hic velit repudiandae blanditiis possimus fugiat
                            voluptas sit consequatur commodi porro.
                        </div>
                        <button className="view-more__button">
                            VIEW MORE <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="home-page__content">
                {/* <div className="carousel__container"> */}
                <BooksCarousel responsive={responsive[1]} books={books} />
                {/* </div> */}
            </div>
            <CustomerInfo />
        </div>
    );
};

export default HomePage;
