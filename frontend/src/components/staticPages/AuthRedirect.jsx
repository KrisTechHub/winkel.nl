import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

export default function AuthRedirect () {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
    return (
        <div className='container mx-auto py-[15%]'>
            <div className='flex flex-col justify-center items-center gap-5 text-xs md:text-sm xl:text-base text-gray-700'>
                <p>You are redirected to this page because you are trying to access a page that can only be accessed by logged in users.</p>
                <p>Please log in to continue.</p>
                <div className='flex flex-col lg:flex-row gap-2 lg:gap-4 w-1/2 items-center justify-center'>
                    <Link to={'/'} className='py-1 lg:py-2 px-2 lg:px-5 bg-black text-white rounded hover:bg-gray-900 transition-hover duration-300 ease-in-out'>
                        <p className='w-full'>Back to Home</p>
                    </Link>
                    <Link to={'/user/register'} className='py-1 lg:py-2 px-2 lg:px-5 bg-black text-white rounded hover:bg-gray-900 transition-hover duration-300 ease-in-out's>
                        <p className='w-full'>Log in / Register</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}