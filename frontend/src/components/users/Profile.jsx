import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@material-tailwind/react';
import { deleteProfile } from '../../../services/users';
import { useSelector } from 'react-redux';
import { UserCircleIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, PencilSquareIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import colors from '../reviews/colours.js';

export default function Profile () {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user)
    const { uuid } = useParams()

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (confirmDelete) {
            await deleteProfile(uuid);
            toast.success("Your account has been successfully deleted.")
            setTimeout(() => {
                navigate('/users');
            }, 1000)
        }
    };

    const address = user.address + user.city + user.postcode + user.countr;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
      };

    console.log(user);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='h-36 w-full' style={{ backgroundColor: `${colors[Math.floor(Math.random() * colors.length)]}`}}></div>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            
            <div className='-mt-12 md:w-3/5'>
                <div className='flex flex-row w-full'>
                    <div className='w-full lg:w-2/6 bg-gray-100 border-[0.2px] flex flex-row items-center justify-center py-8'>
                        <div className='flex flex-col gap-6 items-center'>
                            < UserCircleIcon className='text-gray-400 border-b-[1px] border-gray-300'/>
                            <div className="flex flex-col items-center justify-center ">
                              <div className="flex font-bold gap-2">
                                    <p> {user.firstname.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </p>
                                    <p> {user.lastname.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </p>
                              </div>
                              <p> {user.email} </p>
                            </div>

                            {user.registration_date && (
                                <div>
                                    <div className='italic'>
                                        <p>Member since</p>
                                        <p className='text-sm not-italic'> {formatDate(user.registration_date)} </p>
                                    </div>
                                    <div className='italic'>
                                        <p>Last updated on</p>
                                        <p className='text-sm not-italic'> {formatDate(user.updated_at)} </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                
                    <div className='w-full lg:w-4/6 bg-gray-50 text-left p-8 flex flex-col gap-4'>
                        <div className=''>
                            <div className='font-bold border-b-[1px] border-gray-300 flex justify-between'>
                                <p>Personal Information</p>
                                <Link to={'/maintenance'}>
                                    <PencilSquareIcon className='w-5 text-red-600 cursor-pointer' />
                                </Link>                            </div>
                            <div className='flex flex-col gap-3 py-4'>
                                <div className=''>
                                    <div className='flex gap-2'>
                                        <p>Birthdate: </p>
                                        <p className='italic'>{user.birthdate ? user.birthdate : "Unspecified"}</p>
                                    </div>
                                    <p>Contact Details</p>
                                    <div className='mx-6 flex gap-2 italic'>
                                        <PhoneIcon className='w-4'/>
                                        <p>{user.phonenumber} </p>
                                    </div>
                                    <div className='mx-6 flex gap-2 italic'>
                                        <EnvelopeIcon className='w-4'/>
                                        <p>{user.email} </p>
                                    </div>
                                </div>
                                <div >
                                    <p>Delivery Address</p>
                                    <div className='italic flex gap-2 mx-6'>
                                        <MapPinIcon className='w-4' />
                                        <p > {address.length > 0 ? address : "Address unspecified"} </p>
                                    </div>                                
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='font-bold border-b-[1px] border-gray-300 flex justify-between'>
                                <p>Payment Information</p>
                                <Link to={'/maintenance'}>
                                    <PencilSquareIcon className='w-5 text-red-600 cursor-pointer' />
                                </Link>
                            </div> 
                            <div className='italic py-4 flex gap-2 mx-6'>
                                <CreditCardIcon className='w-4' />
                                <p >No payment information added.</p>    
                            </div>                       
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>

            {/* <h1>User Profile</h1>
            <p>First name: {user.firstname} </p>
            <p>Last name: {user.lastname} </p>
            <p>Email: {user.email} </p>
            <p>Gender: {user.gender} </p>
            <Link to={`/user/${user.uuid}/favorites`}>
                <button>Favorites</button>
            </Link>
            <Link to={`/user/${user.uuid}/cart`}>
                <button>Cart</button>
            </Link>
            <Button onClick={handleDelete}>Delete</Button> */}
        </div>
    );
}