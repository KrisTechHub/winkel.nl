import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating';
import { ReviewService } from '../../../services/reviews';


export default function ProductRating ({productId, size, fontSize}) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {            
                const data = await ReviewService(productId);
                if (Array.isArray(data) && data.length > 0) {
                    const rate = data.map((review) => review.rating) //extract the product ratings
                    const sum = rate.reduce((a, b) => a + b, 0); //sum up all ratings of the product
                    const average = sum / rate.length; //calculate average of ratings
                    const rateString = average.toString().slice(0,3); //convert to string to use slice() to limit rating to 0.0 format
                    setRating(rateString);
                } else {
                    setRating(0)
                }
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
                setRating(0);
            }
        };

        fetchReviews();
    }, [productId])

    return (
        <div className='flex items-center'>
            <Rating 
                readonly={true} 
                initialValue={Number(rating)} 
                size={size}
                allowFraction={true}
            />
            <p className={`${fontSize} font-bold mt-0.5`}>{rating !== 0 && rating} </p> 
        </div>
    );
}

ProductRating.propTypes = {
    productId: PropTypes.string,
    size: PropTypes.number,
    fontSize: PropTypes.string
}