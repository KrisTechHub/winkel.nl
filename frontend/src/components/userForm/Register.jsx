import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearRedirectAfterLogin } from '../../actions/authActions';
import { Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import {  toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import SocialAuth from './SocialAuth';
import CustomInput from '../productForm/CustomInput';
import logo from '../../assets/icon.svg';


const RegisterComponent = ({ login }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirectAfterLogin = useSelector((state) => state.auth.redirectAfterLogin);
    const [isSeller, setIsSeller] = useState(false); // State to track isSeller status

    const onSubmit = (formData) => {
            formData.isSeller = isSeller;
            console.log('isseller', isSeller);
            console.log('formData', formData);
            axios.post(`${process.env.VITE_SERVER}/auth/register`, formData)
                .then(res => {
                    const user = res.data.user;
                    dispatch(login(user));
                    console.log(res.data);
                    toast.success(res.data.message);
                    dispatch(clearRedirectAfterLogin());
                    setTimeout(() => {
                        navigate(redirectAfterLogin || '/', { replace: true })
                    }, 3000)
                }).catch (err => {
                    toast.error(err.response.data.message)
                })

    };
  
    return (
        <div>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            <div className="form-container sign-up-container px-6 py-12 lg:py-0">
                <div className='flex flex-col items-center w-full mb-3 gap-2'>
                    <img className='w-8 lg:w-12' src={logo} alt="" />
                    <Typography className='text-sm lg:text-base font-bold font-PoppinsLight'>Create an account with</Typography>
                    <SocialAuth />
                    <div className="flex items-center justify-center w-full h-8 mb-3">
                        <div className="border-t-[1px] border-gray-300 w-1/2 h-1"></div>
                        <p className="text-center px-3 font-semibold text-gray-600 w-1/6 text-xs lg:text-base">
                        Or
                        </p>
                        <div className="border-t-[1px] border-gray-300 w-1/2 h-1"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
                    <div className="flex flex-col w-full lg:w-2/3 gap-5">
                        <div className="flex flex-col justify-between items-center gap-4 lg:gap-7">
                            <CustomInput type="text" label="First name" name="firstname" {...{required: 'First name is required'}} register={register}  errors={errors} />
                            <CustomInput type="text" label="Last name" name="lastname" {...{required: 'Last name is required'}} register={register}  errors={errors} />
                            <CustomInput type="email" label="Email" name="email" {...{required: 'Email is required'}} register={register}  errors={errors} />
                            <CustomInput type="password" label="Password" name="password" {...{required: 'Password is required'}} register={register}  errors={errors} />
                            <div className='flex justify-center items-center w-full gap-8'>
                                <legend className='text-[15px] text-blue-gray-500'>Gender:</legend>
                                <div className='flex justify-center items-center'>
                                    <CustomInput type="radio" label="Male" name="gender" value="Male" {...{required: 'Gender is required'}} register={register}  errors={errors} />
                                </div>
                               <div className='flex justify-center items-center'>
                                    <CustomInput type="radio" label="Female" name="gender" value="Female" {...{required: 'Gender is required'}} register={register}  errors={errors} />
                               </div>
                            </div>
                            <div className="flex items center">
                                <input type="checkbox" id='isSeller' checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)} className='mr-2' />
                                <label htmlFor="isSeller">Register as a seller</label>
                            </div>
                        </div>
                    </div>

                    <button className='mt-8 mb-2 text-sm lg:text-base bg-secondary-500 w-full' type='submit'>Sign Up</button>
                    <p className='text-xs text-gray-600 '>Already have an account?
                        <Link to={'/user/register'} className='font-bold'> Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
  };

  RegisterComponent.propTypes = {
    login: PropTypes.func.isRequired,
};

const Register =  connect(null, { login })(RegisterComponent);

export default Register;