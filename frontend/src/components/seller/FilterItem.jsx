import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

export default function FilterItem ({data}) {
    const [discount, setDiscount] = useState(0);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (confirmDelete) {
            dispatch(deleteProducts(product.uuid))
            toast.success("Product has been deleted successfully.")
            setTimeout(() => {
                navigate('/');
            }, 2000)
        }
    };


    return (
        <div >
            <div className='grid grid-cols-10 gap-0 py-1 lg:py-3 text-[10px] sm:text-xs lg:text-base font-bold border-b-[1px] border-gray-300'>
                <div className='col-span-1'>
                    <input type="checkbox" />
                </div>
                <div className='col-span-3 lg:col-span-4 text-left'>Product</div>
                <div className='col-span-2 lg:col-span-1'>Unit Price</div>
                <div className='col-span-1 lg:col-span-2'>Quantity</div>
                <div className='col-span-2 lg:col-span-2'>Actions</div>
            </div>            
            {data.map(item => (
                <div key={item}>
                    <div className='grid grid-cols-10 py-1 lg:py-3 items-center text-[10px] sm:text-xs lg:text-base text-black border-b-[1px] border-gray-200'>
                       <div className="col-span-1">
                            <input type="checkbox" />
                       </div>
                       <div className="col-span-3 lg:col-span-4">
                            <Link to={`/product/${item.uuid}`} className='flex gap-2 lg:gap-6 text-left items-center'>
                                <img className='w-8 sm:w-12 lg:w-14 bg-gray-50' src={item.thumbnail} alt="" />
                                <p className=''> {item.title} </p>
                            </Link>
                        </div>
                        <div className="col-span-1 flex flex-col lg:gap-3 justify-center">
                            <p> {item.price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} </p>
                        </div>        
                        <div className="col-span-2 flex flex-col lg:gap-3 justify-center">
                            <p> {item.stock} </p>
                        </div> 
                        <div className="col-span-1 lg:col-span-1 flex flex-row justify-center items-center lg:gap-2 hover:text-black/80 ">
                            <PencilSquareIcon className='w-5' />
                            <Link to={`/product/update/${item.uuid}`} className='cursor-pointer pt-1'>Edit</Link>
                        </div>              
                        <div className="col-span-1 lg:col-span-1 flex flex-row justify-center items-center lg:gap-2 text-red-500 hover:text-red-700 ">
                            <TrashIcon className='w-5' />
                            <p onClick={() => handleDelete(item.uuid)} className='cursor-pointer pt-1'>Delete</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

FilterItem.propTypes = {
    data: PropTypes.array,
}