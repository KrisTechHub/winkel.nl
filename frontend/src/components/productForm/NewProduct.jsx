import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Typography } from '@material-tailwind/react';
import bannerImg from '../../assets/sellerwelcome-small.jpg'
import ValidatedForm from './ValidatedForm';


export default function NewProduct () {
    return (
        <div className='flex flex-col items-center text-center -mt-16 h-full'>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            <div className='w-full flex flex-col justify-center items-center relative'>
                <div className='hidden lg:block overflow-hidden absolute top-0'>
                    <Typography className='text-secondary-700 font-bold text-lg lg:text-4xl absolute left-[15%] lg:left-[18%] top-48 drop-shadow-lg font-ArchivoBlack'>Sell more and become one of our top sellers!</Typography>
                    <img className='w-full object-cover' src={bannerImg} alt="" />
                </div>

                <div className='w-full lg:w-4/6 h-full mt-24 sm:mt-[16rem] lg:mt-[22rem]'>
                    <ValidatedForm />
                </div>
            </div>
        </div>
    );
}