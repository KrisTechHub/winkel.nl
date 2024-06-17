import React from 'react';
import { Link } from 'react-router-dom';

const discounts = [
    {
        percent: 10,
        amount: 199.99
    },
    {
        percent: 15,
        amount: 399.99
    },
    {
        percent: 18,
        amount: 599.99
    }
]

export default function DiscountContainer () {
    return (
        <div>
            <div className='flex w-full justify-center pt-4 md:pt-6'>
                {discounts.map((item, index) => (
                    <Link to={'/maintenance'} key={index} className='flex flex-col w-1/4 items-center justify-center hover:opacity-80 border-r border-gray-500'>
                            <div className='flex flex-row md:gap-1 items-center'>
                                <p className='font-bold text-2xl lg:text-4xl -mr-1'> {item.percent}% </p>
                                <p className='md:font-bold bg-black text-[8px] lg:text-lg text-white lg:rounded px-1 pt-0.5 lg:px-2 rotate-90 lg:rotate-0'> OFF </p>
                            </div>
                            <p className='-mt-1 font-FamiljenGroteskMedium text-[8px] lg:text-[14px]'>ON ORDERS OF €{item.amount}+ </p>
                    </Link>
                ))}
                <div className=" lg:w-1/4 px-4 flex items-center justify-center">
                    <div className='flex flex-col md:flex-row bg-black text-white md:gap-2 px-1 md:px-3 py-0.5 md:py-1 justify-center items-center font-FamiljenGroteskMedium md:rounded'>
                        <p className='text-[8px] md:text-xs lg:text-xl'> CODE: </p>
                        <p className='text-[9px] md:text-sm lg:text-2xl lg:tracking-widest font-bold'>WNL2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}