import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { logout } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Logout () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Successfully logged out.")
        setTimeout(() => {
            navigate('/')
        }, 1000);
    };

    return (
            <button onClick={handleLogout}>Logout</button>
    );
}