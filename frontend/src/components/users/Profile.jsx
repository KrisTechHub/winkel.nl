import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { deleteProfile } from '../../../services/users';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import { UserCircleIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, PencilSquareIcon, CreditCardIcon, WalletIcon, BanknotesIcon } from '@heroicons/react/24/solid';
import colors from '../reviews/colours.js';

export default function Profile () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const products = useSelector(state => state.products.products);
    const [allProducts, setAllProducts] = useState([]);

    const { uuid } = useParams();

    useEffect(() => {
        const allFiltered = products.filter(item => item.author_id === user.uuid);
        setAllProducts(allFiltered);
    }, [user.uuid, products]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );
        if (confirmDelete) {
            await deleteProfile(uuid);
            toast.success("Your account has been successfully deleted.")
            setTimeout(() => {
                dispatch(logout())
            }, 1000)
        }
    };

    const address = user.address + (user.city ? ', ' + user.city : '') +  (user.postcode ? ', ' + user.postcode : '') + (user.country ? ', ' + user.country : '');
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };


    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='h-36 w-full hidden lg:block' style={{ backgroundColor: `${colors[Math.floor(Math.random() * colors.length)]}`}}></div>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            
            <div className='lg:-mt-12 md:w-3/5 '>
                <div className='flex flex-col lg:flex-row w-full gap-2 lg:gap-0'>
                    <div className='w-full lg:w-2/6 lg:bg-gray-100 lg:border-[0.2px] flex flex-row items-center justify-center py-3 lg:py-8 lg:rounded-l-xl'>
                        <div className='flex flex-col gap-3 lg:gap-6 items-center w-full'>
                            <UserCircleIcon className='text-gray-400 border-b-[1px] border-gray-300 w-24 lg:w-48'/>
                            <div className="flex flex-col items-center justify-center ">
                                <div className="flex font-bold gap-2 text-sm lg:text-base">
                                        <p> {user.firstname.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </p>
                                        <p> {user.lastname.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </p>
                                </div>
                                <p className='text-sm lg:text-base'> {user.email} </p>
                                <p className='text-sm lg:text-base'> Seller status: {user.isSeller ? 'Seller' : 'Not Seller' } </p>
                            </div>

                            {user.registration_date && (
                                <div className='flex items-center flex-col'>
                                    <div className='italic text-sm flex'>
                                        <p className='text-sm lg:text-base'>Member since {formatDate(user.registration_date)} </p>
                                    </div>
                                    <div className='italic text-sm'>
                                        <p className='text-sm lg:text-base'>Last updated on  {formatDate(user.updated_at)} </p>
                                    </div>
                                </div>
                            )}

                            <div className='w-full'>
                                <button onClick={handleDelete} className='bg-secondary-500 text-white text-sm lg:text-base lg:py-1 lg:w-2/3'>Delete Account</button>
                            </div>
                        </div>
                    </div>
                
                    <div className='w-full lg:w-4/6 lg:bg-gray-50 text-left p-4 lg:p-8 flex flex-col gap-4 lg:rounded-r-xl'>
                        <div className=''>
                            <div className='font-bold border-b-[1px] border-gray-300 flex justify-between text-sm lg:text-base'>
                                <p>Personal Information</p>
                                <Link to={'/maintenance'}>
                                    <PencilSquareIcon className='w-5 text-red-600 cursor-pointer' />
                                </Link>                            
                            </div>
                            <div className='flex flex-col gap-3 py-4'>
                                <div className=''>
                                    <div className='flex gap-2 text-sm lg:text-base'>
                                        <p>Birthdate: </p>
                                        <p className='italic'>{user.birthdate ? user.birthdate : "Unspecified"}</p>
                                    </div>
                                    <p className='text-sm lg:text-base'>Contact Details</p>
                                    <div className='mx-6 flex gap-2 italic'>
                                        <PhoneIcon className='w-4'/>
                                        <p className='text-sm lg:text-base'>{user.phonenumber ? user.phonenumber : 'Unspecified'} </p>
                                    </div>
                                    <div className='mx-6 flex gap-2 italic'>
                                        <EnvelopeIcon className='w-4'/>
                                        <p className='text-sm lg:text-base'>{user.email} </p>
                                    </div>
                                </div>
                                <div >
                                    <p className='text-sm lg:text-base'>Delivery Address</p>
                                    <div className='italic flex gap-2 mx-6'>
                                        <MapPinIcon className='w-4' />
                                        <p className='text-sm lg:text-base'> {address ? address : "Address unspecified"} </p>
                                    </div>                                
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='font-bold border-b-[1px] border-gray-300 flex justify-between'>
                                <p className='text-sm lg:text-base'>Payment Information</p>
                                <Link to={'/maintenance'}>
                                    <PencilSquareIcon className='w-5 text-red-600 cursor-pointer' />
                                </Link>
                            </div> 
                            <div className='italic py-4 flex gap-2 mx-6 text-sm lg:text-base'>
                                <CreditCardIcon className='w-4' />
                                <p >No payment details added.</p>    
                            </div>                       
                        </div>
                        
                        {user.isSeller && (
                            <div>
                                <div className='font-bold border-b-[1px] border-gray-300 flex justify-between mb-4 text-sm lg:text-base'>
                                    <p>Seller Details</p>
                                    <Link to={'/maintenance'}>
                                        <PencilSquareIcon className='w-5 text-red-600 cu rsor-pointer' />
                                    </Link>
                                </div>
                                <div>
                                    <div className='italic flex gap-2 mx-6 text-sm lg:text-base'>
                                        <WalletIcon className='w-4' />
                                        <p>Selling {allProducts.length > 0 ? allProducts.length : '0'} products </p>
                                    </div>
                                    <div className='italic flex gap-2 mx-6 text-sm lg:text-base'>
                                        <BanknotesIcon className='w-4' />
                                        <p>No earnings yet </p>
                                    </div>
                                </div>
                                <div className='py-6 lg:p-6 flex gap-2 w-full'>
                                    <Link to={'/product/form'} className='w-full'>
                                        <button className='bg-primary-200 w-full text-sm lg:text-base'>Add product</button>
                                    </Link>
                                    <Link to={`/user/profile/${user.uuid}/seller-page`} className='w-full'>
                                        <button className='bg-secondary-500 w-full text-sm lg:text-base'>View seller page</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}