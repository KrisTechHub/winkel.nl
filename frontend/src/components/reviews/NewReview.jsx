import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import {  toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// import { Rating } from 'react-simple-star-rating';
import { ReviewService } from '../../../services/reviews';
import StarRating from './StarRating';

export default function NewReview({ addReview }) {
    const { register, handleSubmit, setValue, reset, watch, formState: { errors }  } = useForm();
    const user = useSelector(state => state.auth.user);
    const { uuid } = useParams();

    const handleRatingChange = (rate) => {
        setValue('rating', rate, { shouldValidate: true });
    }

    const onSubmit = (formData) => {
        formData.author_id = user.uuid;
        formData.product_id = uuid;
        formData.author_name = user.firstname + user.lastname;
        axios.post(`${process.env.VITE_SERVER}/products/${uuid}/reviews`, formData)
            .then(async (res) => {
                const reviews = await ReviewService(uuid); // Fetch updated list of reviews
                const newReview = reviews.filter(review => review.body === formData.body) //filter the newly added review
                addReview({...formData, uuid: newReview[0].uuid}); // Add the new review to the reviews list
                toast.success("Thank you for your feedback. Your review has been posted!");
                reset();
                setValue('rating', -1)
            })
            .catch((error) => {
                toast.error('Error submitting review:');
                reset();
            });
    };



    const errorClass = "border-[1px] border-red-500 drop-shadow-xs shadow-red" 
    const successClass = "border-2 border-green-300 drop-shadow-xs shadow-green"
    const focusClass = "focus:outline-none"
    return (
        <div className={`${user ? "flex flex-col justify-start" : "hidden"}`}>
            <Typography className='text-gray-900 text-base lg:text-xl font-bold mb-2  italic border-gray-400'>Leave a review</Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col justify-center text-left mx-auto items-start gap-2">
                    <div className='flex flex-col w-1/2'>
                        <StarRating onRatingChange={handleRatingChange} size={22}/>
                        <input type="hidden" step="0.5" min="0" max="5" {...register('rating', {required: true, valueAsNumber: true, min: 0.5, max: 10})} />
                        {errors.rating && <span className='text-red-500 text-xs'>Product rating cannot be zero.</span> }
                    </div>


                    <div className='w-full'>
                        <textarea 
                            {...register('body', {required: true, maxLength: 250})} 
                            className={`text-xs lg:text-sm rounded p-3 w-full border-[1px] border-gray-200 ${errors.body ? errorClass : ''} ${watch('body') ? successClass : ''} ${focusClass}`} 
                            placeholder='What can you say about the product?' 
                        />
                        
                        <div >
                            {watch('body') ? (
                                <p className='text-xs text-green-500'>Looks good!</p>
                            ) : (
                                errors.body && <p className='text-red-500 text-xs'>Review content is required.</p>
                            )}
                        </div>
                    </div>

                    <button type='submit' className='bg-gray-400 w-full text-xs text-black font-bold h-8'>SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

NewReview.propTypes = {
    addReview: PropTypes.func.isRequired,
};
