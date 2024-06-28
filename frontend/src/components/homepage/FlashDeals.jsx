import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import {BoltIcon} from '@heroicons/react/24/solid';

export default function FlashDeals ({ data }) {
    const [ onSale, setOnSale ] = useState([]);

    useEffect(() => {
        if (data) {
            const onSaleProducts = data.filter(item => item.discount >= 16);
            setOnSale(onSaleProducts);
        }
    }, [data]);

    const slickSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        draggable: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 4,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
                initialSlide: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2
              }
            }
        ]
    };


    return (
        <div className='flex flex-col mx-4 py-2 lg:py-8'>
            <div className='flex flex-row gap-1 items-center mb-4 mx-auto'>
                <p className='text-[12px] md:text-xs lg:text-xl font-bold '>FLASH DEALS </p>
                <BoltIcon className='h-4 lg:h-7 w-3 lg:w-5 text-white bg-black rounded-[2px] lg:rounded'/>
            </div>

            <Slider {...slickSettings} >
                {onSale.map((item) => (
                    <div key={item.uuid} className="px-1 md:px-1 lg:px-2 xl:px-2">
                        <Link to={`/product/${item.uuid}`}>
                            <div className="overflow-hidden relative h-28 md:h-44 lg:h-56 2xl:h-64 rounded">
                                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                            </div>

                            <div className="flex flex-col mt-2">
                                <p color="blue-gray" className="text-[10px] lg:text-[14px] text-left max-h-4 lg:max-h-8 overflow-hidden">
                                    {item.title.length > 29 ? item.title.slice(0, 29) + '...' : item.title}
                                </p>
                                <div className="flex text-red-500 gap-1 items-center">
                                    <p className='text-[12px] md:text-[14px] md:text-lg font-bold'>{item.price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} </p>
                                    <p className='text-[8px] md:text-xs border-[0.5px] border-red-500 px-0.5 lg:px-1'>-{Math.round(item.discount)}%</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

FlashDeals.propTypes = {
    data: PropTypes.array,
}
