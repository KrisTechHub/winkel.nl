import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating';

const labels = [
    "Terrible+", "Terrible", 
    "Bad+", "Bad", 
    "Average", "Average+", 
    "Good", "Good+", 
    "Excellent", "Excellent+"
];

export default function StarRating ({ onRatingChange, size }) {
    const [hoverIndex, setHoverIndex] = useState(-1);

    const handleRating = (rate) => {
        onRatingChange(rate);
    };

    const handleonPointerMove = (index) => {
        setHoverIndex((index * 2) - 1);
    };

    const handleonPointerLeave = () => {
        setHoverIndex(-1)
    };


    return (
        <div className='flex relative items-center w-full'>
            <div className='flex justify-end'>
                <Rating 
                    initialValue={0}
                    onClick={handleRating}
                    onPointerMove={handleonPointerMove}
                    onPointerLeave={handleonPointerLeave}
                    allowFraction={true}
                    size={size}
                    fillColor="orange"
                    emptyColor="gray"
                />
            </div>
            {hoverIndex >= 0 && (
                <div className=' mx-2 top-[-30px] text-[11px] tracking-wider text-gray-300 bg-gray-900 border-[1px] border-gray-400 py-[2px] px-2 rounded drop-shadow-md'>
                    {labels[hoverIndex]}
                </div>
            )}
        </div>
    );
}

StarRating.propTypes = {
    onRatingChange: PropTypes.func,
};