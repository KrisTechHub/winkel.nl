import React from 'react';
import { Link } from 'react-router-dom';
import { categBanner } from './categBanner';


export default function CategoryContainer () {
    return (
        <div className='text-center py-2 sm:py-5'>
            <div className="flex flex-wrap justify-center ">
                {categBanner.slice(1, 13).map((categData, index) => (
                    <Link to={`/category/${categData.categ}`} key={index}>
                        <div className='flex flex-col md:flex-row items-center justify-start rounded-full md:bg-gray-200 hover:drop-shadow-md md:ps-1.5 md:py-1 w-11 md:w-32 lg:w-[170px] 2xl:w-[200px] my-1.5 mx-2 lg:mx-3 transition-hover duration-200 ease-in-out'>
                            <div className='h-11 w-11 lg:h-14 lg:w-14 p-1.5 rounded-full overflow-hidden bg-gray-100 md:bg-white'>
                                <img src={categData.thumbnail} alt={categData.label} />
                            </div>
                            <p className='text-center md:text-left text-[9px] md:text-xs lg:text-[14px] ps-2 lg:font-bold'>
                                {categData.categ.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}