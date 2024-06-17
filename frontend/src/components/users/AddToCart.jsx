import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { setRedirectAfterLogin } from '../../actions/authActions'; // Assuming you have this action


export default function AddToCart ({ btnType, productId, iconClass }) {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!user) {
            dispatch(setRedirectAfterLogin(`/product/${productId}`)); // Set redirect path
            navigate('/user/register');
            return;
        }

        const customerId= user.uuid;
        const quantity = 1;
        console.log({customerId, quantity});

        try {
            const res = await axios.post(`${process.env.VITE_USER_SERVER}/${productId}/cart`, { customerId, quantity });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <button onClick={handleSubmit} className='flex justify-center items-center'> 
            {btnType === "icon" ? <PlusCircleIcon className={`${iconClass} w-5 h-5 text-secondary-400 hover:text-secondary-500`} /> : "Add to cart" } 
        </button>
    );
}

AddToCart.propTypes = {
    btnType: PropTypes.string,
    productId: PropTypes.string,
    iconClass: PropTypes.string
}