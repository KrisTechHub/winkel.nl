import React, { useEffect, useState } from 'react';
import { ProductsService } from '../../../services/products';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Homebanner from '../banners/Homebanner';
import Products from '../products/Products'
import DiscountContainer from '../banners/DiscountContainer';
import CategoryContainer from '../categories/CategoryContainer';
import FlashDeals from './FlashDeals';
import HomeFeature from './HomeFeature';
import GalleryComponent from './GalleryComponent';
import { useSelector } from 'react-redux';


export default function Home () {
    const products = useSelector(state => state.products.products);
    // const [ open, setOpen ] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(true);

    // const toggleCollapse = () => setOpen((cur) => !cur);


    useEffect(() => {
        const handleWindowResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };
        handleWindowResize();

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <div className="xl:container mx-auto">
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />
            <Homebanner />
            <div className="">
                <DiscountContainer />
                <CategoryContainer />
                <FlashDeals data={products} />
                <HomeFeature data={products} />
                {/* products */}
                <div className=''>
                    <div className="text-left">
                        <span className='text-[8px] sm:text-xs md:text-sm lg:text-base font-bold bg-black text-white rounded mb-4 p-1 border-[1px] border-black px-2 lg:px-4 tracking-widest'> RECOMMENDED </span>
                    </div>
                    { isLargeScreen ? (
                        <Products products={products} extendedStyle="flex flex-wrap justify-between mx-2" widthEach="lg:w-[19%] xl:w-[16%] 2xl:w-[13.7%]" sliceStartIndex={0} numOfItem={21}/>
                    ) : (
                        <Products products={products} extendedStyle="flex flex-wrap justify-between mx-2" widthEach="w-[48%] sm:w-[32%] md:w-[24%]" sliceStartIndex={0} numOfItem={12}/>
                    )}

                    <Link to={'category/allproducts'}>
                        <button className='mt-8 font-bold bg-secondary-500 h-5 sm:h-7 md:h-9 w-20 sm:w-24 md:w-36 text-[10px] sm:text-xs md:text-base md:w-sm'>Show more</button>
                    </Link>

                </div> 

                <GalleryComponent />
            </div>
        </div>
    );
}