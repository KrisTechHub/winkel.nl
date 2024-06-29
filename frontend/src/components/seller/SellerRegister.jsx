import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { updateIsSeller } from '../../actions/authActions';
import img from '../../assets/sellerregister.png';

export default function SellerRegister() {
    const user = useSelector(state => state.auth.user);
    const isSellerRedux = useSelector(state => state.auth.isSeller); // Get isSeller from Redux state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSeller, setIsSeller] = useState(isSellerRedux); // Initialize state with Redux value

    const handleSubmit = async () => {
        try {
            await axios.put(`${process.env.VITE_SERVER}/users/seller/register`, { isSeller, sellerId: user.uuid });
            dispatch(updateIsSeller(isSeller)); // Update Redux state
            toast.success("Successfully registered as a seller!");
            setTimeout(()=> {
                navigate('/seller/welcome')
            }, 2000)
        } catch (error) {
            console.error('Error updating isSeller status:', error);
            toast.error('Failed to update isSeller status');
        }
    };


    return (
        <div>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            <div className="relative xl:w-2/3 bg-gray-200 mx-auto overflow-hidden rounded-3xl lg:mt-24 lg:py-8">
                <div className="relative z-10 p-6 lg:p-16 flex flex-col lg:flex-row gap-4 lg:gap-0">
                    <div className='lg:w-1/2 text-left flex flex-col gap-4 lg:gap-8 order-2 lg:order-1'>
                        <div>
                            <div className='flex lg:flex-col gap-2 lg:gap-0 font-bold text-xl lg:text-5xl font-ArchivoBlack'>
                                <p> Word  </p>
                                <p> Winkel.nl verkoper </p>
                            </div>
                            <p className='text-sm lg:text-2xl italic'>Verkoop op uw gemak aan de wereld</p>
                        </div>
                        <p className='text-sm lg:text-lg'>Vink het vakje hieronder aan om u te registreren als verkoper en begin met het plaatsen van uw producten!</p>
                        <div className="flex flex-col items center gap-2">
                            <div>
                                <input type="checkbox" id='isSeller' checked={isSeller} onChange={(e) => setIsSeller(e.target.checked)} className='mr-2' />
                                <label className='lg:text-lg' htmlFor="isSeller">Registreer u als verkoper</label>
                            </div>
                            <button className='bg-black text-white' onClick={handleSubmit}>Verzenden</button>
                        </div>
                        <p className='text-xs font-bold'>*Geen registratiekosten</p>
                    </div>

                    <div className='lg:w-1/2 order-1 lg:order-2'>
                        <img className='w-2/3 mx-auto drop-shadow-2xl lg:pt-36 -rotate-6' src={img} alt="" />
                    </div>
                </div>

                <div className="absolute bottom-0 w-full h-1/2 z-0">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
                    <path fill="#fff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,197.3C672,181,768,139,864,117.3C960,96,1056,96,1152,128C1248,160,1344,224,1392,256L1440,288V320H0Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
