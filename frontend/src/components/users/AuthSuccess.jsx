import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions';
import { toast } from 'react-toastify';


export default function AuthSuccess () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserSocialAccount = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const user = JSON.parse(params.get('user'));
                console.log(user);
                if (user) {
                    dispatch(login(user));
                    toast.success(`Welcome back, ${user.firstname}! Shop more, save more!`);
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 1000);
                } else {
                    throw new Error('No user data found');
                }
            } catch (err) {
                toast.error(err.message || "Failed to log in.");
                navigate('/user/login', { replace: true });
            }
        };
        getUserSocialAccount();         
    }, [navigate, dispatch]);

    return <div>Loading...</div>;
}