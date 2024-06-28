import React from 'react';
import Slider from 'react-slick';
import {galleryItems}  from './imgs.js';

export default function GalleryComponent () {

    const slickSettings = {
        className: "center",
        dots: true,
        centerMode: false,
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        rows: 2,
        slidesPerRow: 2,
        pauseOnHover: true,
        draggable: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    };
    return (
        <div className='mt-20'>
            <div className=" flex flex-col items-center text-center md:text-left mb-3 ">
                <span className='text-[8px] sm:text-xs md:text-sm lg:text-base font-bold bg-black text-white rounded p-1 border-[1px] border-black px-2 lg:px-4 tracking-widest'>GALLERY</span>
                <p className='text-[13px] md:text-[15px] pt-2 -mb-1 text-gray-700'>This is how customers use our stuff. Be inspired by their tips and hacks!</p>
                <p className='text-[13px] md:text-[15px] text-gray-700'>See your photo here? Share it with #winkelNederland and tag @winkelNederland.</p>
            </div>
            <Slider {...slickSettings}>
                { galleryItems.map((item, idx) => (
                    <div key={idx} className='h-24 md:h-48 w-24 overflow-hidden px-1'>
                        <img className='h-full w-full object-cover hover:scale-110 transition-scale duration-300 ease-in-out' src={item} alt="item" />
                    </div>
                )) }
            </Slider>
        </div>
    );
}