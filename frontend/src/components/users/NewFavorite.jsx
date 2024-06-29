import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { setRedirectAfterLogin } from '../../actions/authActions'; // Assuming you have this action

export default function NewFavorite ({btnType, productId, iconClass }) {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!user) {
            navigate('/user/register');
            dispatch(setRedirectAfterLogin(`/product/${productId}`)); // Set redirect path
            return;
        }
        
        const customerId= user.uuid;
        try {
            const res = await axios.post(`${process.env.VITE_SERVER}/users/${productId}/favorites`, {customerId})
            toast.success(res.data.message)

        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding to favorites.");
        }
       
    };

    return (
        <button onClick={handleSubmit} className='flex justify-center items-center'> 
            {btnType === "icon" ? <HeartIcon className={`${iconClass} text-gray-500 hover:gray-800`} /> : "Add to Favorites" } 
        </button>
    );
}

NewFavorite.propTypes = {
    btnType: PropTypes.string,
    productId: PropTypes.string,
    iconClass: PropTypes.string,
}