import React from 'react';
import { Link } from "react-router-dom";
import { Carousel, Typography } from '@material-tailwind/react';
import slideImg1 from "../../assets/banners/salebannerbg.svg";
import slideImg2 from "../../assets/banners/skincare1.jpg";
import slideImg3 from "../../assets/banners/dresses.jpg";
import slideImg4 from "../../assets/banners/electronics3.jpg";
import slideImg5 from "../../assets/banners/cart3.jpg";

const slides = [
    {
        style: {
            backgroundImage: `url(${slideImg1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
        },
        title: "SUMMER",
        title2: "BIG SALE",
        subtitle: "UP TO 30% OFF",
        link: "/category/allproducts",
        btnText: "SHOP NOW",
        btnStyle: "rounded-3xl bg-applegreen-800 hover:bg-applegreen-900 text-white",
        titleStyle: "font-ShadowsIntoLight text-applegreen-900 text-2xl lg:text-5xl font-bold",
        title2Style: "font-KronaOne text-4xl md:text-5xl lg:text-7xl font-bold",
        subtitleStyle: "font-FamiljenGroteskMedium text-xl lg:text-2xl",
        containerStyle: "xl:bottom-[12%] xl:right-[15%]"
    },
    {
        style: {
            backgroundImage: `url(${slideImg2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
        },
        title: "Natural",
        title2: "Skin Care Matters",
        subtitle: "30% DISCOUNT ON ALL ITEMS",
        link: "/category/skincare",
        btnText: "SHOP NOW",
        btnStyle: "bg-cyan-300 hover:bg-cyan-400 text-white tracking-wider rounded",
        titleStyle: "font-PoppinsLight text-cyan-900 text-xl md:text-4xl -ms-24 lg:-ms-52 -mb-2 font-bold tracking-wider",
        title2Style: "font-Sacramento text-4xl md:text-7xl font-bold",
        subtitleStyle: "font-FamiljenGroteskMedium border-[1px] border-black px-3 lg:px-5 lg:pb-1 text-sm lg:text-2xl",
        containerStyle: "xl:bottom-[12%] xl:left-[6%]"
    },
    {
        style: {
            backgroundImage: `url(${slideImg3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
        },
        title: "VACATION",
        title2: "Guide Style",
        subtitle: "2024",
        link: "/category/womens-dresses",
        btnText: "SHOP SUMMER SALE",
        btnStyle: "bg-secondary-400 hover:bg-primary-950 text-white",
        titleStyle: "font-KronaOne text-xl md:text-3xl font-bold text-secondary-400 drop-shadow-xl",
        title2Style: "font-ShadowsIntoLight text-5xl md:text-8xl font-bold tracking-wider text-white",
        subtitleStyle: "font-ShadowsIntoLight font-bold text-2xl md:text-5xl -mt-4 text-white",
        containerStyle: "xl:bottom-[12%] xl:left-[15%]"
    },
    {
        style: {
            backgroundImage: `url(${slideImg4})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
        },
        title: "KICK OFF SALE",
        title2: "UP TO 80% OFF",
        subtitle: "",
        link: "/category/laptops",
        btnText: "SHOP DEALS >",
        btnStyle: "rounded -lg bg-gray-600 hover:bg-gray-700 text-white",
        titleStyle: "text-gray-800 text-xl md:text-3xl font-bold",
        title2Style: "font-KronaOne text-3xl md:text-5xl font-bold",
        subtitleStyle: "font-FamiljenGroteskMedium text-xl md:text-2xl",
        containerStyle: "xl:bottom-[20%] "
    },
    {
        style: {
            backgroundImage: `url(${slideImg5})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
        },
        title: "So lit Deals",
        title2: "PAYDAY",
        subtitle: "Up to €60 OFF!",
        link: "/category/allproducts",
        btnText: "SHOP NOW >",
        btnStyle: "bg-blue-300 hover:bg-secondary-950 text-white",
        titleStyle: "font-ShadowsIntoLight bg-white text-blue-300 px-4 text-2xl md:text-5xl font-bold",
        title2Style: "font-KronaOne text-4xl md:text-7xl font-bold",
        subtitleStyle: "font-FamiljenGroteskMedium text-xl md:text-2xl",
        containerStyle: "xl:bottom-[12%] xl:left-[15%]"
    },
];



export default function Homebanner() {

    return (
            <Carousel className="carousel lg:rounded-lg" loop autoplay
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span key={i} className={`block h-1 cursor-pointer rounded-2xl transition-all  content-[''] ${
                            activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                        />
                    ))}
                    </div>
                )} >
                {slides.map((slide, index) => (
                    <div key={index} style={slide.style} className="h-[300px] lg:rounded flex items-center justify-center relative">
                    <div className={`${slide.containerStyle} flex flex-col gap-1 lg:gap-2 xl:absolute items-center`}>
                        <Typography className={slide.titleStyle}>{slide.title}</Typography>
                        <Typography className={slide.title2Style}>{slide.title2}</Typography>
                        <Typography className={slide.subtitleStyle}>{slide.subtitle}</Typography>
                        <Link to={slide.link}>
                            <p className={`${slide.btnStyle} tracking-wider py-1 lg:py-2 px-3 lg:px-6 text-[12px] md:text-sm lg:text-lg transition-hover duration-200 ease-in-out`}>
                                {slide.btnText}
                            </p>
                        </Link>
                    </div>
                </div>
                ))}
            </Carousel>
    );
}
