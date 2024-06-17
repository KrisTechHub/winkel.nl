import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteReview } from '../../../services/reviews';
import { Rating } from 'react-simple-star-rating';
import colors from './colours.js';

const labels = [
    "Terrible+", "Terrible", 
    "Bad+", "Bad", 
    "Average", "Average+", 
    "Good", "Good+", 
    "Excellent", "Excellent+"
];

export default function Reviews({ reviews, onDelete }) {
    const user = useSelector(state => state.auth.user);
    const { uuid } = useParams();


    const deleteReview = async (review_id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your review?"
        );
        if (confirmDelete) {
            await DeleteReview(uuid, review_id);
            onDelete(review_id); // Call the parent handler to update the state
            toast.success("Your review has been successfully deleted.");
        }
    };


    return (
        <div>
            <div className='spy-10'>
                {reviews.length === 0 && (
                    <div>
                        <p className='text-xs lg:text-base italic text-center'>No reviews on this product yet.</p>
                    </div>
                )}
                {reviews.length > 0 && reviews.map((item, i) => (
                    <div key={i || item.uuid} className="bg-gray-100 border-[0.5px] border-gray-200 mt-2 rounded">
                        {/* RATING DETAILS */}
                        <div className="flex items-center bg-gray-200 w-full px-3 py-1 gap-1">                       
                            <Rating readonly={true} initialValue={Number(item.rating)} size={18} allowFraction={true} />
                            <span className="text-gray-600 text-xs pt-[2px] font-bold">
                                {item.rating && labels[(item.rating * 2) - 1]}
                            </span>
                        </div>
                        
                        <div className='p-3'>
                            <div className="flex gap-2 py-1">
                                {/* SEMI-COLON SVG */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="mt-1 block w-3 h-3 text-gray-400" viewBox="0 0 975.036 975.036">
                                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                </svg>

                                {/* REVIEW BODY */}
                                <Typography className="text-xs mb-2"> {item.body}</Typography>
                            </div>

                            {/* REVIEW AUTHOR DETAILS */}
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    <div style={{ backgroundColor: `${colors[Math.floor(Math.random() * colors.length)]}`}} className="w-8 h-8 text-black rounded-full flex justify-center items-center text-xl font-bold"> 
                                        {item.author_name.slice(0,1).replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                                    </div>

                                    <span className="flex-grow flex flex-col pl-4">
                                        {item.author_name && 
                                            <p className="text-xs font-bold text-gray-900">{item.author_name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                                        }
                                        <span className="text-gray-600 text-[10px]">Customer</span>
                                    </span>
                                </div>
                                <div className='h-7'>
                                    {user && item.author_id === user.uuid && (
                                        <button className="bg-red-700 hover:bg-red-600 px-2 w-full h-full text-xs text-black" onClick={() => deleteReview(item.uuid)}>Delete</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Reviews.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            uuid: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            body: PropTypes.string.isRequired,
            author_id: PropTypes.string.isRequired,
            author_name: PropTypes.string, // Assuming author_name is optional
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired
};
