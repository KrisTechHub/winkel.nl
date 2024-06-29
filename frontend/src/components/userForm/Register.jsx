import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearRedirectAfterLogin } from '../../actions/authActions';
import { Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import {  toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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

            <div className="form-container sign-up-container px-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col items-center w-2/3 mb-3'>
                        <img className='w-12 py-3' src={logo} alt="" />
                        <Typography className='font-bold font-PoppinsLight'>Create an account with</Typography>
                        <div className="flex gap-2">
                            <a href='http://google.com' target='_blank'>
                                <div className='social-btn'>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.76 10.77L19.67 10.42H12.23V13.58H16.68C16.4317 14.5443 15.8672 15.3974 15.0767 16.0029C14.2863 16.6084 13.3156 16.9313 12.32 16.92C11.0208 16.9093 9.77254 16.4135 8.81999 15.53C8.35174 15.0685 7.97912 14.5191 7.72344 13.9134C7.46777 13.3077 7.33407 12.6575 7.33 12C7.34511 10.6795 7.86792 9.41544 8.79 8.47002C9.7291 7.58038 10.9764 7.08932 12.27 7.10002C13.3779 7.10855 14.4446 7.52101 15.27 8.26002L17.47 6.00002C16.02 4.70638 14.1432 3.9941 12.2 4.00002C11.131 3.99367 10.0713 4.19793 9.08127 4.60115C8.09125 5.00436 7.19034 5.59863 6.43 6.35002C4.98369 7.8523 4.16827 9.85182 4.15152 11.9371C4.13478 14.0224 4.918 16.0347 6.34 17.56C7.12784 18.3449 8.06422 18.965 9.09441 19.3839C10.1246 19.8029 11.2279 20.0123 12.34 20C13.3484 20.0075 14.3479 19.8102 15.2779 19.42C16.2078 19.0298 17.0488 18.4549 17.75 17.73C19.1259 16.2171 19.8702 14.2347 19.83 12.19C19.8408 11.7156 19.8174 11.2411 19.76 10.77Z" fill="#ffffff"></path> </g></svg>                
                                </div>
                            </a>
                            <a href='http://facebook.com' target='_blank'>
                                <div className='social-btn'>
                                    <svg fill="#ffffff" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1168.737 487.897c44.672-41.401 113.824-36.889 118.9-36.663l289.354-.113 6.317-417.504L1539.65 22.9C1511.675 16.02 1426.053 0 1237.324 0 901.268 0 675.425 235.206 675.425 585.137v93.97H337v451.234h338.425V1920h451.234v-789.66h356.7l62.045-451.233H1126.66v-69.152c0-54.937 14.214-96.112 42.078-122.058" fillRule="evenodd"></path> </g></svg>
                                </div>
                            </a>
                            <a href='http://x.com' target='_blank'>
                                <div className='social-btn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0,0,256,256">
                                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"><g transform="scale(5.12,5.12)"><path d="M5.91992,6l14.66211,21.375l-14.35156,16.625h3.17969l12.57617,-14.57812l10,14.57813h12.01367l-15.31836,-22.33008l13.51758,-15.66992h-3.16992l-11.75391,13.61719l-9.3418,-13.61719zM9.7168,8h7.16406l23.32227,34h-7.16406z"></path></g></g>
                                    </svg>                
                                </div>
                            </a>
                        </div>
                        <div className="flex items-center justify-center w-full h-8 mb-3">
                            <div className="border-t-[1px] border-gray-300 w-1/2 h-1"></div>
                            <p className="text-center px-3 font-semibold text-gray-600 w-1/6">
                            Or
                            </p>
                            <div className="border-t-[1px] border-gray-300 w-1/2 h-1"></div>
                        </div>
                    </div>

                    <div className="flex flex-col w-2/3 gap-5">
                        <div className="flex flex-col justify-between items-center gap-7">
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

                    <button className='mt-8 mb-2' type='submit'>Sign Up</button>
                    <Typography className='text-[12px] text-gray-600 font-PoppinsLight '>Already have an account? Click on the left panel to Sign in</Typography>
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