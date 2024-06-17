import React, { useEffect, useState } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams, Link } from "react-router-dom";
import { HomeIcon, ShareIcon , TagIcon, TruckIcon, CreditCardIcon, UserGroupIcon, CurrencyEuroIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { ToastContainer } from 'react-toastify';
import { ProductService } from '../../../services/products';
import { ReviewService } from '../../../services/reviews';
import { Typography } from '@material-tailwind/react';
import NewFavorite from '../users/NewFavorite';
import NewReview from '../reviews/NewReview';
import Reviews from '../reviews/Reviews';
import AddToCart from '../users/AddToCart';
import GalleryComponent from '../homepage/GalleryComponent';
import ProductRating from '../reviews/ProductRating';


export default function ProductDetail() {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ images,  setImages ] = useState([]);
    const [ deliveryRange, setDeliveryRange ] = useState('');
    const { uuid } = useParams();
    
    useEffect(() => {

        //FETCH PRODUCTS BY CATEGORY
        const fetchProduct = async () => {
            const data = await ProductService(uuid);
            if (data) {
                setProduct(data);
                const imgsArray = JSON.parse(data.images);
                const transformedImg = imgsArray.map((imgUrl, index) => ({
                  original: imgUrl,
                  thumbnail: imgUrl
                }));
                setImages(transformedImg);
            } 
        };
        
        //FETCH REVIEWS
        const fetchReviews = async () => {
            const data = await ReviewService(uuid);
            if (Array.isArray(data)) {
                setReviews(data);
            }
        };

        //define window size
        const handleWindowResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };
        
        fetchProduct();
        fetchReviews();
        handleWindowResize();
  
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [uuid]);

    useEffect(() => {
        const calculateDeliveryDate = (days) => {
          const currentDate = new Date();
          const endDate = new Date(currentDate);
          const startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() + 1)
          endDate.setDate(currentDate.getDate() + days);
          const startDateStr = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
          const endDateStr = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
          return `${startDateStr} - ${endDateStr}`;
        };
  
        setDeliveryRange(calculateDeliveryDate(2))
    }, [])

    // const handleDelete = async () => {
    //     const confirmDelete = window.confirm(
    //         "Are you sure you want to delete this product?"
    //     );
    //     if (confirmDelete) {
    //         await DeleteProduct(uuid);
    //         toast.success("Product has been deleted successfully.")
    //         setTimeout(() => {
    //             navigate('/');
    //         }, 2000)
    //     }
    // };

    const addReview = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };

    const handleDeleteReview = (review_id) => {
        setReviews((prevReviews) => prevReviews.filter((review) => review.uuid !== review_id));
    };

    if (!product) {
        return <div>Loading...</div>
    }


    return (
        <section className='lg:container mx-auto lg:px-10 py-2 text-gray-600 h-full'>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            
            {/* TOP LINKS */}
            <div className='hidden md:flex text-xs text-gray-700 gap-2 my-6 items-center text-left'>
                <Link to={'/'}>
                    <HomeIcon className='w-4 ms-4 lg:ms-1 hover:text-gray-900 transition-hover duration-200 ease-in-out'/>
                </Link>
                /
                {product.category && (
                    <Link to={`/category/${product.category}`}>
                    <Typography className='hover:text-gray-900 transition-hover duration-200 ease-in-out'>
                        {product.category.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                    </Typography>
                    </Link>
                )}
                /
                <Typography className='font-bold'> {product.title} </Typography>
            </div>

            
            {/* PRODUCT DETAILS */}
            <div className="mx-auto flex flex-col lg:flex-row">
                {/* IMAGE GALLERY */}
                <div className=" lg:w-1/2">
                    <ImageGallery
                            items={images}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            slideOnThumbnailOver={true}
                            showIndex={false}
                            showNav={false}
                            slideDuration={0}
                            disableThumbnailScroll={true}
                            thumbnailPosition={ isLargeScreen ? 'left' : 'bottom'}
                            lazyLoad={true }
                        />

                    { isLargeScreen && (
                        <div className='text-left mt-12'>
                            { product.uuid && 
                                <NewReview addReview={addReview} />
                            }

                            {/* REVIEWS */}
                            <Typography className='text-gray-900 text-base lg:text-xl font-bold my-5 border-b-[1px] border-gray-400'>Customer Reviews</Typography>
                            {reviews.length > 0 && (
                                <div className='text-black rounded p-2 bg-gray-100'>
                                    <ProductRating productId={product.uuid} size={22} fontSize={"text-sm ms-1"} /> 
                                </div>
                            )}
                            <Reviews reviews={reviews} onDelete={handleDeleteReview}/>
                        </div>
                    )}
                </div>

                {/* DETAIL */}
                <div className="flex flex-col gap-3 lg:gap-6 lg:w-1/2 w-full px-5 lg:px-0 lg:pl-8 mt-6 lg:mt-0 text-left">
                    {/* TITLE / BRAND / SHARE */}
                    <div className='border-b-[1px] lg:pb-2 border-gray-300'>
                        <h2 className="text-sm title-font text-gray-500 tracking-widest"> {product.brand} </h2>
                        <h1 className="text-gray-900 text-xl lg:text-3xl font-bold mb-1">{product.title}</h1>
                                    {/* REVIEWS */}
                        <div className="flex w-full items-center">
                            <div className="w-1/2">
                                <ProductRating productId={product.uuid} size={18} fontSize={"text-sm ms-1"} />
                            </div>

                            {/* SHARE ON SOCIAL MEDIA */}
                            <span className="flex w-1/2 items-center justify-end lg:justify-start lg:ml-3 lg:pl-3 py-2 lg:border-l-2 border-gray-300 space-x-1 lg:space-x-2">
                                <a className="text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                                </a>
                                <a className="text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                                </a>
                                <a className="text-gray-500">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>
                                </a>
                                <a >
                                <ShareIcon className='w-4 ms-1'/>
                                </a>
                            </span>
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className='flex flex-col gap-1'>
                        <div className="flex gap-2 lg:gap-3 items-end">
                            <Typography className="font-bold text-xl lg:text-3xl text-black">€{product.price ? product.price.toLocaleString() : 'N/A'}</Typography>
                            <Typography className="font-bold text-lg lg:text-2xl line-through">€{(product.price * 2).toLocaleString()}</Typography>
                        </div>
                        <div className='flex lg:items-center gap-2'>
                            <TagIcon className='h-4 mt-1 lg:mt-0'/>
                            <Typography>Save <span className='text-[12px] lg:text-sm text-red-500 font-bold'> 50%</span> when you purchase before the sale ends</Typography>
                        </div>
                    </div>
            
                    {/* DESCRIPTION
                    <div className='flex flex-col gap-2'>
                        <Typography className='text-black font-bold'>Description</Typography>
                        <Typography className="">{product.description}</Typography>
                    </div> */}
            
                    {/* COLOR / SIZE */}
                    <div className="flex items-center border-b-[1px] border-gray-100 w-full">
                        <div className="flex w-1/2">
                            <span className="mr-3 text-sm lg:text-base">Color</span>
                            <button className="border-2 border-gray-300 rounded-full w-5 h-5 lg:w-6 lg:h-6 focus:outline-none"></button>
                            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-5 h-5 lg:w-6 lg:h-6 focus:outline-none"></button>
                            <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-5 h-5 lg:w-6 lg:h-6 focus:outline-none"></button>
                        </div>
                        <div className="flex w-1/2 lg:ml-6 items-center">
                            <span className="mr-3 text-sm lg:text-base">Variant</span>
                            <div className="relative">
                                <select className="rounded border border-gray-300 lg:py-2 lg:px-3 px-[1px] focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm lg:text-base">
                                    <option>SM</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* BUTTON AND FAV */}
                    <div className="flex flex-col gap-2">
                        <div className="flex text-black">
                            <div className="flex w-4/5 font-bold text-white text-sm justify-center bg-black border-0 focus:outline-none hover:bg-gray-900 transition-hover duration-200 ease-in-out rounded relative">
                                <AddToCart btnType='word' productId={product.uuid} />
                            </div>
                            <div className='w-1/5 rounded text-sm  hover:border-black transition-hover duration-200 ease-in-out'>
                                <NewFavorite btnType='icon' productId={product.uuid} iconClass={"w-8 h-8"} />
                            </div>
                        </div>
                        <div>
                            <Typography className='text-xs'>Earn up to <span className='text-red-500'>3</span> WINKEL Points calculated at checkout.</Typography>
                        </div>
                    </div>

                    {/* POLICY AND DELIVERY */}
                    <div className='flex flex-col gap-2 lg:gap-3 bg-gray-200 w-full lg:w-3/4 rounded p-4'>
                        <Typography className='text-sm lg:text-base font-bold text-black'>Shipping within 
                            <span className='font-normal'> Netherlands</span> & to <span className='font-normal	'>Germany</span>
                        </Typography>
                        <div>
                            <div className="flex gap-2">
                                <TruckIcon className='w-5'/>
                                <Typography className='text-xs lg:text-sm font-bold text-black'> Free standard shipping on orders over €199</Typography>
                            </div>
                            <div className='ps-7'>
                                <Typography className='text-xs'>Delivery: <span className='text-black'> {deliveryRange}</span></Typography>
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-2">
                                <CurrencyEuroIcon className='w-5'/>
                                <Typography className='text-xs lg:text-sm font-bold text-black'> Payment Policy</Typography>
                            </div>
                            <div className='ps-7'>
                                <Typography className='text-xs'>Learn More</Typography>
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-2">
                                <ArrowLeftEndOnRectangleIcon className='w-5'/>
                                <Typography className='text-xs lg:text-sm font-bold text-black'> Return Policy</Typography>
                            </div>
                            <div className='ps-7'>
                                <Typography className='text-xs'>Learn More</Typography>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <CreditCardIcon className='w-5'/>
                            <Typography className='text-xs lg:text-sm text-black font-bold'>100% Secured Payment</Typography>
                        </div>

                        <div className="flex gap-2 items-center">
                            <UserGroupIcon className='w-5'/>
                            <Typography className='text-xs lg:text-sm text-black font-bold'>Made by the Professionals</Typography>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className='text-left w-full lg:w-3/4'>
                        <Typography className='border-b-[1px] lg:py-3 border-gray-400 text-gray-900 tex-base lg:text-lg font-bold lg:mb-1'>Product Description</Typography>
                        <Typography className='border-b-[1px] py-3 text-xs lg:text-base border-gray-300 text-black'> {product.description} </Typography>
                        <div className='flex border-b-[1px] py-3 border-gray-300 justify-between'>
                        <Typography className='text-xs lg:text-base'>Availability</Typography>
                        <Typography className={`font-bold text-xs lg:text-base ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}> {product.stock ? "Available" : "Not availale"} </Typography>
                        </div>
                        <div className='flex border-b-[1px] py-3 border-gray-300 justify-between'>
                        <Typography className='text-xs lg:text-base'>Stocks</Typography>
                        <Typography className='text-black text-xs lg:text-base'> {product.stock} </Typography>
                        </div>
                        <div className='flex border-b-[1px] py-3 border-gray-300 justify-between'>
                        <Typography className='text-xs lg:text-base'>Category</Typography>
                        { product.category && (
                            <Typography className='text-black text-xs lg:text-base'> {product.category.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </Typography>
                        )}
                        </div>
                    </div>
                </div>


            </div>
            { !isLargeScreen && (
                <div className='text-left px-5 lg:px-0 mt-6'>
                    { product.uuid && 
                        <NewReview addReview={addReview} />
                    }

                    {/* REVIEWS */}
                    <Typography className='text-gray-900 text-base lg:text-xl font-bold my-5 border-b-[1px] border-gray-400'>Customer Reviews</Typography>
                    {reviews.length > 0 && (
                        <div className='text-black rounded p-2 bg-gray-100'>
                            <ProductRating productId={product.uuid} size={22} fontSize={"text-sm ms-1"} /> 
                        </div>
                    )}
                    <Reviews reviews={reviews} onDelete={handleDeleteReview}/>
                </div>
            )}

            {isLargeScreen && <GalleryComponent/>}

        </section>
    );
}
