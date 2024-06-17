import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

export default function AuthRedirect () {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
    return (
        <div className='container mx-auto py-[15%]'>
            <div className='flex flex-col justify-center items-center gap-5'>
                <Typography className='text-lg text-gray-700'>You are redirected to this page because you are trying to access a page that can only be accessed by logged in users.</Typography>
                <Typography className='text-lg text-gray-700'>Please log in to continue.</Typography>
                <div className='flex gap-4 w-1/2 items-center justify-center'>
                    <Link to={'/'} className='py-2 px-5 bg-black text-white rounded hover:bg-gray-900 transition-hover duration-300 ease-in-out'>
                        <button className='w-full'>Back to Home</button>
                    </Link>
                    <Link to={'/user/register'} className='py-2 px-5 bg-black text-white rounded hover:bg-gray-900 transition-hover duration-300 ease-in-out's>
                        <button className='w-full'>Log in / Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}