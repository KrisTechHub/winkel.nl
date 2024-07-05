import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearRedirectAfterLogin } from '../../actions/authActions';
import { Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {  toast, ToastContainer } from 'react-toastify';
import SocialAuth from './SocialAuth';
import CustomInput from '../productForm/CustomInput';
import logo from '../../assets/icon.svg'


export default function Login()  {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirectAfterLogin = useSelector((state) => state.auth.redirectAfterLogin);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        axios.post(`${process.env.VITE_SERVER}/auth/login`, formData)
            .then(res => {
                    const user = res.data.user;
                    console.log('user from frontend',user);
                    user.isSeller = Boolean(user.isSeller)
                    dispatch(login(user));
                    toast.success(res.data.message);
                    dispatch(clearRedirectAfterLogin());
                    setTimeout(() => {
                        navigate(redirectAfterLogin || '/', { replace: true })
                    }, 1000)
            }).catch (err => {
                toast.error(err.response.data.message)
            });
    }

    return (
        <div >
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            <div className="form-container sign-in-container py-12 lg:py-0 bg-white flex items-center justify-center">
                <div className='flex flex-col justify-center items-center gap-6 w-2/3'>
                    <div className='flex flex-col items-center gap-6 w-full justify-center'>
                        <img className='w-8 lg:w-12 -mb-4' src={logo} alt="" />
                        <Typography className='font-bold font-PoppinsLight text-sm lg:text-base'>Sign in with</Typography>
                        <SocialAuth />
                        <div className="flex items-center justify-center w-3/4 h-8">
                            <div className="border-t-[1px] border-gray-300 w-1/2 h-1"></div>
                            <p className="text-center px-3 font-semibold text-gray-600 w-1/6 text-xs lg:text-base">
                            Or
                            </p>
                            <div className="border-t-[1px] border-gray-300 w-1/2 h-1"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-6 w-full'>
                        <div className="flex flex-col w-full gap-5">
                            <div className="flex flex-col justify-between items-center gap-4 lg:gap-8">
                                <CustomInput type="email" label="Email" name="email" {...{required: 'Email is required'}} register={register}  errors={errors} />
                                <CustomInput type="password" label="Password" name="password" {...{required: 'Password is required'}} register={register}  errors={errors} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-gray-600 w-full -mt-1 lg:-mt-5">
                            <div className="flex gap-2">
                                <input type="checkbox" name="rememberme" id="rememberme"/>
                                <label htmlFor='rememberme' className='font-PoppinsLight text-xs inline-block'>Remember me</label>
                            </div>
                            <a href="" className='hover:opacity-90'>
                                <Typography className='font-PoppinsLight font-bold text-xs'>Forgot your password?</Typography>
                            </a>
                        </div>

                        <div className='w-full lg:-mt-3'>
                            <button className='text-sm lg:text-base bg-secondary-500 w-full'>Sign In</button>
                            <p className='text-sm text-gray-600 mt-1 lg:mt-2'>Don't have an account? 
                                <Link to={'/user/register'} className='font-bold'> Sign up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}