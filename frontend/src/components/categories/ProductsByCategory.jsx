import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { FetchByCategory } from "../../../services/category";
import { ProductsService } from '../../../services/products';
import Products from '../products/Products';
import Categories from './Categories';
import { categBanner } from './categBanner';
import { ToastContainer } from 'react-toastify';
import CategoryBanner from '../banners/CategoryBanner';

export default function ProductsByCategory() {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        const getProductsByCategory = async (category) => {
            if (category === 'allproducts') {
                const data = await ProductsService();
                if (data) {
                    setFilteredData(data);
                }
            } else {
                const filteredProducts = await FetchByCategory(category);
                if (filteredProducts) {
                    setFilteredData(filteredProducts);
                }
            }
        };

        const handleWindowResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        getProductsByCategory(category);
        handleWindowResize();

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [category]);

    const bannerData = category === 'allproducts' 
        ? categBanner.find(allProduct => allProduct.categ === "allproducts")
        : categBanner.find(item => item.categ === category);

    
    return (
        <section className='xl:container mx-auto font-PoppinsLight'>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />

            <CategoryBanner bannerData={bannerData} />

            <div className='my-8 hidden lg:block'>
                <p className="text-gray-900 text-base text-left font-bold">
                    <Link to={'/'} className='hover:text-gray-900 '>Home </Link>
                    / {category.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </p>
            </div>

            <div className="flex text-left -mt-32 sm:-mt-24 md:-m-0">
                {isLargeScreen && (
                    <div className="w-1/6">
                        <Link to="/category/allproducts" className={`cursor-pointer ${category === "allproducts" && 'font-bold'}`}>All Products</Link>
                        <Categories currentCategory={category} />
                    </div>
                )}
                <div className="lg:w-5/6 border-l-[1px] border-gray-300 lg:pl-6">
                    <Products products={filteredData} extendedStyle="flex flex-wrap justify-between lg:justify-start mx-2 lg:gap-3" widthEach="w-[48%] sm:w-[32%] md:w-[24%] lg:w-[24%] xl:w-[19%] 2xl:w-[15%]" sliceStartIndex={0} numOfItem={filteredData.length} />
                </div>
            </div>
        </section>
    );
}
