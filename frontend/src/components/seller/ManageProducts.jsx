import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import FilterSection from './FilterSection';

export default function ManageProducts () {


    return (
        <div className='w-full items-start flex flex-col p-4 gap-4'>
            <div className='flex text-sm items-center gap-1'>
                <Link to={'/'}>Home </Link> 
                <ChevronRightIcon className='h-4' />
                <Link to={''}>Profile</Link>
                <ChevronRightIcon className='h-4' />
            </div>
            <div className='w-full flex justify-between'>
                <div>
                    <p className='text-2xl font-bold'>Manage Products</p>
                </div>
                <div className='w-1/2 flex gap-1'>
                    <button className='rounded-lg bg-white border-[1px] border-secondary-500 text-secondary-500'>Optimize Products</button>
                    <button className='rounded-lg bg-white border-[1px] border-secondary-500 text-secondary-500'>Bulk Manage</button>
                    <button className='rounded-lg bg-secondary-500 text-white'>
                        <Link to={'/product/form'}>New Product</Link>
                    </button>
                </div>
            </div>
            <div className='flex justify-between bg-primary-100 w-full text-sm'>
                <div className='flex p-2 rounded gap-2'>
                    <InformationCircleIcon className='w-5 text-secondary-800' />
                    <p>Welcome to Product Management Page.</p>
                    <a className='text-secondary-800'>Learn more</a>
                </div>
                <div className='flex items-center pe-3'>
                    <XMarkIcon className='w-5 text-gray-800'/>
                </div>
            </div>
            <FilterSection />
        </div>
    );
}