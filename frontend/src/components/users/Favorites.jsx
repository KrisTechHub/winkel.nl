import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCartIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { viewFaves } from '../../../services/users';
import { ToastContainer } from 'react-toastify';
import AddToCart from './AddToCart';

export default function Favorites () {
    const [ favorites, setFavorites ] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const { uuid } = useParams();

    useEffect(() => {
        const handleWindowResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        const getFaves = async() => {
            const data = await viewFaves(uuid);
            if (data) {
                setFavorites(data);
                setTotalPrice(data.map(item => item.product_price));
            }
        };

        handleWindowResize();
        getFaves();

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    },[uuid])

    useEffect(() => {
        const calculateTotalAmount = (prices) => {
            let sum = 0;
            for (let i = 0; i < prices.length; i++) {
                sum += prices[i];
            }
            return sum;
        };

        setTotalAmount(calculateTotalAmount(totalPrice));
    }, [totalPrice]);

    return (
        <div className='md:pt-6 lg:pt-12 flex flex-col gap-2 md:gap-3'>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />

            <div className='flex items-center w-full h-12 gap-2 text-base md:text-xl lg:text-2xl px-12'>
                <p className='font-bold'>Winkel.nl</p> 
                <p className='border-l-[1px] text-xs md:text-lg lg:text-xl border-gray-400 ps-2'>Favorites</p>
            </div>
            
            <div className="bg-gray-100 flex md:py-2 ps-4 gap-2 text-[11px] md:text-[13px] lg:text-sm lg:px-8">
                <ShoppingCartIcon className='w-5 text-green-600' />
                <p>Add favorite items to cart for check out before they are sold out!</p>
            </div>
            
            {favorites.length > 0 && (
                <div className='flex flex-col gap-1 lg:gap-3'>
                    <div className='bg-gray-50 border-[1px] border-gray-100 grid grid-cols-10 gap-0 lg:px-8 py-1 lg:py-3 text-[10px] sm:text-xs lg:text-base font-bold'>
                        <div className='col-span-4 text-left'>Product</div>
                        <div className='col-span-4 lg:col-span-3 text-left'>Description</div>
                        <div className='col-span-1 lg:col-span-2'>Price</div>
                        <div className='col-span-1'>Actions</div>
                    </div>

                    <div>
                        {favorites.map((item, i) => (
                            <div key={i} className='bg-gray-50 border-[1px] border-gray-100 py-1 lg:py-3 lg:px-8'>

                                {/* ITEMS */}
                                <div className='grid grid-cols-10 py-1 lg:py-3 items-center text-[10px] sm:text-xs lg:text-base'>
                                    <div className="col-span-4 ">
                                        <Link to={`/product/${item.product_uuid}`} className='flex gap-2 lg:gap-6 text-left items-center'>
                                            <img className='w-8 sm:w-12 lg:w-14' src={item.product_thumbnail} alt="" />
                                            <p className=''> {item.product_title} </p>
                                        </Link>
                                    </div>
                                    <div className="col-span-4 lg:col-span-3">
                                        <p className='text-left'> {item.product_description.length > 47 ? item.product_description.slice(0, 47) + "..." : item.product_description} </p>
                                    </div>
                                    <div className="col-span-1 lg:col-span-2 flex flex-col lg:gap-3 justify-center text-left lg:text-center">
                                        <p className='line-through text-gray-500'> {(item.product_price * 2).toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} </p>
                                        <p>{item.product_price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} </p>
                                    </div>
                                    <div className="col-span-1 flex flex-col lg:gap-2 items-center">
                                        <p  className='text-red-500 cursor-pointer -mb-4 lg:mb-0'>Delete</p>
                                        { isLargeScreen ? (
                                            <AddToCart btnType="word" productId={item.product_uuid}/>
                                        ) : (
                                            <AddToCart btnType="icon" iconClass={"w-4 mt-3"} productId={item.product_uuid}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* CART FOOTER  */}
                    <div className='bg-gray-50 border-[1px] border-gray-100 grid grid-cols-10 gap-0 py-1 lg:py-3 lg:px-8 mb-3 font-bold items-center text-[10px] sm:text-xs lg:text-base'>
                        <div className='col-span-2 text-left sm:text-right pe-2'>No. of items:</div>
                        <div className='col-span-1 text-left'>{favorites.length}</div>
                        <div className='col-span-3 text-right'>Items Total Price</div>
                        <div className='col-span-2'> {totalAmount.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} </div>
                        <div className='col-span-1 lg:col-span-2'>
                            <Link to={`/user/${uuid}/cart`}>
                                <p className='bg-black text-white w-full lg:px-2 cursor-pointer py-1 rounded font-bold'>Go to Cart</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {favorites.length === 0 && (
                <div className='bg-gray-100 py-10'>
                    <p className='text-xs md:text-sm lg:text-lg font-bold'>No products found.</p>
                    <p className='text-sm md:text-base lg:text-xl font-bold'>Browse out new products today!</p>
                    <Link to={'/category/allproducts'} >
                        <button className='bg-black text-white w-28 lg:w-40 mt-5 text-xs'>See new trends</button>
                    </Link>
                </div>
            )}
        </div>
    );
}