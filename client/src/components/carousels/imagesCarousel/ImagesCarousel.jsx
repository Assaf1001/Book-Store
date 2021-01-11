import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImagesCarouselItem from "./ImagesCarouselItem";

const imageData = [
    {
        img:
            "https://a-static.besthdwallpaper.com/tokyo-ghoul-kaneki-ken-black-reaper-wallpaper-1920x1280-9351_38.jpg",
        text: "Become a MANGA member..",
        button: "SIGN UP",
        textColor: "#ff6600",
    },
    {
        img:
            "https://s.yimg.com/hz/en_us/Finance/US_AFTP_SILICONALLEY_H_LIVE/Teens_are_absolutely_obsessed_with-aa5988138ba7fda278d39e6ac9635cf8",
        text: "Check out our new releases!",
        button: "NEW RELEASES",
        textColor: "white",
    },
    {
        img:
            "https://a-static.besthdwallpaper.com/sword-art-online-alicization-alice-synthesis-thirty-eugeo-kirito-wallpaper-1920x1080-18491_48.jpg",
        text: "New MANGA is on the way",
        button: "COMING SOON",
        textColor: "black",
    },
    {
        img: "https://wallpapercave.com/wp/fB42Y0H.jpg",
        text: "We will be happy to hear from you",
        button: "CONTACT US",
        textColor: "white",
    },
];

const ImagesCarousel = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="images-carousel__container">
            <Carousel
                // autoPlay={true}
                // autoPlaySpeed={3000}
                infinite={true}
                showDots={true}
                responsive={responsive}
            >
                {imageData.map((image) => (
                    <ImagesCarouselItem
                        image={image.img}
                        text={image.text}
                        button={image.button}
                        textColor={image.textColor}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default ImagesCarousel;
