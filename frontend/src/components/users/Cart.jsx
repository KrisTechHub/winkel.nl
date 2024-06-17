import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TruckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { viewCart, updateCartItem, deleteCartItem } from '../../../services/cart';
import { ToastContainer } from 'react-toastify';
import NewFavorite from './NewFavorite';

export default function Cart () {
    const user = useSelector(state => state.auth.user);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isLargeScreen, setIsLargeScreen] = useState(true);


    useEffect(() => {
        const handleWindowResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        const getCart = async () => {
            const data = await viewCart(user.uuid);
            if (data) {
                setCart(data);
                setTotalPrice(data.map(item => item.product_price * item.quantity));
            }
        };

        handleWindowResize();
        getCart();

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [user.uuid]);

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

    const handleIncrement = (item) => {
        const newQuantity = item.quantity + 1;
        updateItemQuantity(item.cart_id, newQuantity);
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            updateItemQuantity(item.cart_id, newQuantity);
        }
    };

    const updateItemQuantity = async (cartId, newQuantity) => {
        try {
            await updateCartItem(user.uuid, cartId, newQuantity);
            setCart(cart.map(item => item.cart_id === cartId ? { ...item, quantity: newQuantity } : item));
            setTotalPrice(cart.map(item => item.cart_id === cartId ? item.product_price * newQuantity : item.product_price * item.quantity));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (cartId) => {
        try {
            await deleteCartItem(user.uuid, cartId);
            setCart(cart.filter(item => item.cart_id !== cartId));
        } catch (error) {
            console.log(error);
        }
    };

    // console.log('cart', cart);

    return (
        <div className='md:pt-6 lg:pt-12 flex flex-col gap-2 md:gap-3'>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />

            <div className='flex items-center w-full h-12 gap-2 text-base md:text-xl lg:text-2xl px-12'>
                <p className='font-bold'>Winkel.nl</p> 
                <p className='border-l-[1px] text-xs md:text-lg lg:text-xl border-gray-400 ps-2'>Shopping Cart</p>
            </div>

            <div className="bg-gray-100 flex md:py-2 ps-4 gap-2 text-[11px] md:text-[13px] lg:text-sm">
                <TruckIcon className='w-5 text-green-600' />
                <p>Select free shipping voucher below to enjoy shipping discount</p>
            </div>

            {cart.length > 0 && (
                <div className='flex flex-col gap-1 lg:gap-3'>
                    <div className='bg-gray-50 border-[1px] border-gray-100 grid grid-cols-10 lg:grid-cols-14 gap-0 py-1 lg:py-3 text-[10px] sm:text-xs lg:text-base font-bold'>
                        <div className='col-span-1'>
                            <input type="checkbox" />
                        </div>
                        <div className='col-span-3 lg:col-span-5 text-left'>Product</div>
                        <div className='col-span-2 lg:col-span-2'>Unit Price</div>
                        <div className='col-span-1 lg:col-span-2'>Quantity</div>
                        <div className='col-span-2 lg:col-span-2'>Total Price</div>
                        <div className='col-span-1 lg:col-span-2'>Actions</div>
                    </div>

                    {cart.map((item) => (
                        <div key={item.cart_id} className='bg-gray-50 border-[1px] border-gray-100 py-1 lg:py-3'>

                            {/* CART HEADER */}
                            <div className='grid grid-cols-10 lg:grid-cols-14'>
                                <div className='col-span-1'>
                                    <input type="checkbox" />
                                </div>
                                <div className='col-span-9 lg:col-span-12 flex gap-2 text-xs sm:text-sm lg:text-lg'>
                                    <p className=' text-left font-bold tracking-tight'> {item.product_authorName ? item.product_authorName : 'Winkel Shop'} </p>
                                    <ChatBubbleLeftRightIcon className='w-5 text-secondary-400' />
                                </div>
                            </div>

                            {/* ITEMS */}
                            <div className='grid grid-cols-10 lg:grid-cols-14 py-1 lg:py-3 items-center text-[10px] sm:text-xs lg:text-base'>
                                <div className="col-span-1">
                                    <input type="checkbox" />
                                </div>
                                <div className="col-span-3 lg:col-span-5 flex gap-1 lg:gap-6 text-left items-center">
                                    <img className='w-8 lg:w-14' src={item.product_thumbnail} alt="" />
                                    <p> {item.product_title} </p>
                                </div>
                                <div className="col-span-2 flex flex-col lg:gap-3 justify-center">
                                    <p className='line-through text-gray-500'> €{item.product_price * 2},00 </p>
                                    <p> €{item.product_price},00 </p>
                                </div>
                                <div className="col-span-1 lg:col-span-2 flex items-center justify-center">
                                    <button onClick={() => handleDecrement(item)} className={`border-[1px] border-gray-200 h-4 lg:h-auto lg:w-1/6 rounded-none ${item.quantity === 1 && 'text-gray-500 cursor-not-allowed'}`}>-</button>
                                    <button disabled className='border-[1px] border-gray-200 h-4 lg:h-auto lg:w-1/6 rounded-none cursor-text'>{item.quantity}</button>
                                    <button onClick={() => handleIncrement(item)} className='border-[1px] border-gray-200 h-4 lg:h-auto lg:w-1/6 rounded-none'>+</button>
                                </div>
                                <div className="col-span-2">
                                    <p className='font-bold'> €{item.product_price * item.quantity},00 </p>
                                </div>
                                <div className="col-span-1 lg:col-span-2 flex flex-col justify-center items-center lg:gap-2">
                                    <p onClick={() => handleDelete(item.cart_id)} className='text-red-500 cursor-pointer'>Delete</p>
                                    { isLargeScreen ? (
                                        <NewFavorite btnType="word" productId={item.product_uuid}/>
                                    ) : (
                                        <NewFavorite btnType="icon" iconClass={"w-4 -mt-4"} productId={item.product_uuid}/>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* CART FOOTER  */}
                    <div className='bg-gray-50 border-[1px] border-gray-100 grid grid-cols-10 lg:grid-cols-14 gap-0 py-1 lg:py-3 mb-3 font-bold items-center text-[10px] sm:text-xs lg:text-base'>
                        <div className='hidden lg:block lg:col-span-4 text-left'></div>
                        <div className='col-span-3 text-right pe-2'>No. of items:</div>
                        <div className='col-span-1 text-left'>{cart.length}</div>
                        <div className='col-span-2 text-right'>TOTAL PRICE</div>
                        <div className='col-span-2'> €{totalAmount},00 </div>
                        <div className='col-span-2'>
                            <p className='bg-black text-white lg:px-2 w-full lg:w-2/3 cursor-pointer py-1 rounded font-bold'>Check out</p>
                        </div>
                    </div>
                </div>
            )}

            {cart.length === 0 && (
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
