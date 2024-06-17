import React from 'react';
import { Link } from 'react-router-dom';

export default function Orders () {
    return (
        <div className='lg:py-6'>
            <div className='bg-gray-100 py-24 lg:py-36'>
                <p className='text-xs md:text-sm lg:text-lg font-bold'>You have no orders yet.</p>
                <p className='text-sm md:text-base lg:text-xl font-bold'>Check out some products from your cart</p>
                <p className='text-sm md:text-base lg:text-xl font-bold'>or</p>
                <p className='text-sm md:text-base lg:text-xl font-bold'>Browse our new products to check sale items today!</p>
                <Link to={'/category/allproducts'} >
                    <button className='bg-black text-white w-28 lg:w-40 mt-5 text-xs'>See new trends</button>
                </Link>
            </div>
        </div>
    );
}