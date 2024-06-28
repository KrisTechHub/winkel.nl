import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReviewService } from '../../../services/reviews';


export default function ProductRating ({size, fontSize, productId, showNum }) {
    const { uuid } = useParams();
    const products = useSelector(state => state.products.products);
    const [product, setProduct] = useState([]);
    const [realRating, setRealRating] = useState(0);
    const [numOfRealRating, setnumOfRealRating] = useState(0);
    const [dummyRating, setDummyRating] = useState(0);
    const [numOfDummyRating, setNumOfDummyRating] = useState(0);
    const [ totalRating, setTotalRating ] = useState(0);
    const [ totalNumOfRating, setTotalNumOfRating ] = useState(0);
    const id = uuid || productId;

    useEffect(() => {
        if (id && products.length > 0) {
            const item = products.filter(item => item.uuid === id)[0];
            setProduct(item);
        }
    }, [id, products])

    //for REAL REVIEWS
    useEffect(() => {
        const fetchReviews = async () => {
            try {            
                const data = await ReviewService(uuid);
                if (Array.isArray(data) && data.length > 0) {
                    const rate = data.map((review) => review.rating) //extract the product ratings
                    const rateNumber = rate.map(Number).reduce((acc, current) => acc + current, 0); //turn to a number then calculate sum
                    const average = rateNumber / rate.length; //calculate average of ratings
                    const formattedRating = average.toFixed(1); // Round to 1 decimal place
                    setRealRating(formattedRating);
                    setnumOfRealRating(rate.length)
                } else {
                    setRealRating(0)
                    setnumOfRealRating(0)
                }
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
            }
        };

        if (uuid) {
            fetchReviews();
        }
    }, [uuid]);

    useEffect(() => {
        if (product) {
            setDummyRating(product.rating);
            if (product.reviews) {
                setNumOfDummyRating(product.reviews.length);
            } else {
                setNumOfDummyRating(0);
            } 
        } else {
            setDummyRating(0)
        }
    }, [product]);

    useEffect(() => {
        if (numOfRealRating || numOfDummyRating) {
            const total = numOfRealRating + numOfDummyRating;
            setTotalNumOfRating(total);
        }
        if (realRating && dummyRating) {
            const newRateArr = (Number(realRating) + dummyRating)/totalNumOfRating;
            setTotalRating(newRateArr.toFixed(1))
        } else if (realRating && !dummyRating) {
            setTotalRating(realRating)
        } else if (!realRating && dummyRating) {
            setTotalRating(dummyRating)
        } else {
            setTotalRating(0)
        }
    }, [numOfRealRating, numOfDummyRating, realRating, dummyRating, totalNumOfRating, totalRating]);


    return (
        <div className='flex items-center'>
            <Rating 
                readonly={true} 
                initialValue={Number(totalRating)} 
                size={size}
                allowFraction={true}
            />
            <p className={`${fontSize} font-bold mt-0.5`}>{totalRating !== 0 && totalRating}</p> 
            {showNum === true && <p className={`${fontSize} mt-0.5 ps-1`}> ({totalNumOfRating} reviews) </p>}
        </div>
    );
}

ProductRating.propTypes = {
    productId: PropTypes.string,
    size: PropTypes.number,
    fontSize: PropTypes.string,
    dummyRating: PropTypes.number,
    numOfDummyReviews: PropTypes.number,
    showNum: PropTypes.bool
}