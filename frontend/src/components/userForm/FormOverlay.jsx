import React from 'react';
import { Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import bgImg from '../../assets/form/cartoon.jpg'


export default function FormOverlay ({ signInButton, signUpButton }) {
    return (
        <div>
            <div className="overlay-container">
                <img className='h-full w-auto object-cover absolute  brightness-50' src={bgImg} alt="" />
                <div className="overlay z-[99999] flex items-center">
                
                    {/* LOG IN OVERLAY */}
                <div className="overlay-panel overlay-left gap-2">
                    <Typography className='text-5xl font-bold font-ShadowsIntoLight tracking-widest'>Welcome Back!</Typography>
                    <Typography className='text-xl drop-shadow-xl font-PoppinsLigh'> Unlock Savings Today: Sign in and Shop Smarter! </Typography>
                    <button type="button" onClick={signInButton} className="ghost hover:scale-105 transition-scale duration-200 ease-in-out font-PoppinsLight" id="signIn" >
                    Sign In
                    </button>
                </div>

                
                
                {/* SIGN UP OVERLAY */}
                <div className="flex overlay-panel overlay-right gap-5">
                    <Typography className='text-5xl font-bold font-ShadowsIntoLight tracking-widest'>Shop with us now!</Typography>
                    <Typography className='text-xl drop-shadow-xl font-PoppinsLight'>Join Now for Exclusive Deals and Bigger Savings!</Typography>
                    <button type="button" onClick={signUpButton} className=" ghost hover:scale-105 transition-scale duration-200 ease-in-out font-PoppinsLight" id="signUp" >
                        Sign Up
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}


FormOverlay.propTypes = {
    signInButton: PropTypes.func,
    signUpButton: PropTypes.func,
}