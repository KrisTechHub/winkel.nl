import React from 'react';3
import { Link } from 'react-router-dom';
import img from '../../assets/sellerwelcome.jpg';
import shopimglg from '../../assets/shop/shopimage.png';
import shopimgsm from '../../assets/shop/mobileshopimg.png';
import shopimgmd from '../../assets/shop/tabletshopimg.png'

export default function SellerWelcome () {
    return (
        <div className='' >
            <div className='w-full bg-[#bfc2c7] font-bold '>
                <div className='pt-24'>
                    <p className='lg:text-4xl pb-1 font-ArchivoBlack'>Welcome to Seller Center</p> 
                    <p className='lg:text-5xl font-ArchivoBlack'>Winkel.nl</p>
                </div>
                <div className='w-full'>
                    <img src={img} alt="" className='w-full lg:h-[580px] object-cover'/>
                </div>
            </div>

            <div className='bg-gray-300 py-6 lg:text-xl font-bold'>
                <p>More than 70% of Retail Sellers generate their first sale in less than 60 days.</p>
            </div>

           <div className='flex lg:h-[600px]'>
                <div className='w-1/2 flex flex-col justify-center text-left gap-4 ps-8'>
                    <p className='lg:text-4xl font-bold'>Sell with the fastest growing and <br /> preferred acquisition channel</p>
                    <p className='lg:text-2xl'>Get started and earn while you run your <br /> business at your convenience.</p>
                    <Link to={'/product/form'}>
                        <button className='bg-black text-white w-1/4'>Upload a product</button>
                    </Link>
                </div>
                <div className='relative w-1/2'>
                    <div className=' py-12 w-2/3 m-auto h-full '>
                        <img src={shopimglg} alt="" className='object-cover w-full rounded-xl drop-shadow-xl'/>
                    </div> 
                    <div className='absolute w-1/5 top-[150px] left-6 rounded-xl drop-shadow-xl'>
                        <img src={shopimgsm} alt="" className='h-full w-full rounded-xl p-1 bg-white '/>
                    </div>
                    <div className='absolute w-2/5 h-64 top-[300px] right-2 rounded-xl drop-shadow-xl'>
                        <img src={shopimgmd} alt="" className='h-full w-full rounded-xl p-1 bg-white'/>
                    </div>
                </div>
           </div>

        </div>
    );
}