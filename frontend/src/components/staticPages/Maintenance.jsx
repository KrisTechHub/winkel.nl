import React from 'react';
import { Link } from "react-router-dom";
import maintenance from "../../assets/workingwoman.jpg";



export default function Maintenance () {
    return (
        <div className='mx-auto w-full -mb-20 bg-white'>
            <div className="flex flex-col lg:flex-row items-center overflow-hidden">
                <img className="h-full w-7/12 object-cover" src={maintenance} alt="" />
                <div className='lg:-ms-24'>
                    <h1 className='font-bold text-base sm:text-3xl lg:text-5xl xl:text-6xl text-gray-500 pb-3 sm:pb-5 lg:pb-10'>Page is under construction.</h1>
                    <Link to={"/"} className='font-bold text-gray-900 tracking-wider text-[10px] sm:text-[15px] md:text-sm lg:text-base py-2 lg:py-4 px-3 lg:px-6 bg-gray-500 rounded-md lg:rounded-lg hover:text-black hover:bg-gray-400 transition-hover duration-200 ease-in-out'>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}