import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Products from '../products/Products';
import DatePeriod from './DatePeriod';

export default function FilteredProducts() {
    const products = useSelector(state => state.products.products);
    const { filter } = useParams();
    const [filteredData, setFilteredData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState('none');
    const [categoryFilter, setCategoryFilter] = useState('');
    const filterRef = useRef(null); // Ref for filter options div
    const [sortVisible, setSortVisible] = useState(false);
    const [filterPriceVisible, setFilterPriceVisible] = useState(false);
    const [filterCategoryVisible, setFilterCategoryVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [priceFilters, setPriceFilters] = useState({
        'Less than € 10': false, '€ 10 - 80': false, '€ 80 - 200': false, '€ 200 - 400': false, '€ 400 - 900': false, '€ 900 - 1500': false, '€ 1500 - 3000': false, '€ 3000- 5000': false, 'More than € 5000': false
    });
    const [priceFilterCounts, setPriceFilterCounts] = useState({
        'Less than € 10': 0, '€ 10 - 80': 0, '€ 80 - 200': 0, '€ 200 - 400': 0, '€ 400 - 900': 0, '€ 900 - 1500': 0, '€ 1500 - 3000': 0, '€ 3000- 5000': 0, 'More than € 5000': 0
    });

    useEffect(() => {
        const handleWindowResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
        };
        handleWindowResize();

        const handleOutsideClick = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setSortVisible(false); // Close filter options if clicked outside
                setFilterPriceVisible(false);
                setFilterCategoryVisible(false);
            }
        };
        window.addEventListener("resize", handleWindowResize);
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const categs = Array.from(new Set(products.map(product => product.category)));
        setCategories(categs);
        const counts = getPriceFilterCounts(products);
        setPriceFilterCounts(counts);
        applyFilters();
    }, [products, filter, sortOrder, priceFilters, categoryFilter]);

    useEffect(() => {
        const counts = getPriceFilterCounts(filteredData);
        setPriceFilterCounts(counts);
    }, [filteredData]);

    const applyFilters = () => {
        let filteredProducts = products;

        if (filter === "new") {
            filteredProducts = filteredProducts.filter(product => product.weight < 8);
        } else if (filter === "on-sale") {
            filteredProducts = filteredProducts.filter(product => product.discount > 15);
        } else if (filter === "most-buy") {
            filteredProducts = filteredProducts.filter(product => product.stock < 30);
        } else if (filter === "recommended") {
            filteredProducts = filteredProducts.filter(product => product.rating > 4.5);
        }

        // Apply category filter
        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
        }

        // Apply price range filters
        filteredProducts = applyPriceFilters(filteredProducts);

        // Apply sorting based on sortOrder
        if (sortOrder === "low-to-high") {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-to-low") {
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredData(filteredProducts);
    };

    const applyPriceFilters = (products) => {
        const activeFilters = Object.values(priceFilters).some(value => value);

        if (!activeFilters) {
            return products;
        }

        return products.filter(product => {
            if (priceFilters['Less than € 10'] && product.price <= 10) return true;
            if (priceFilters['€ 10 - 80'] && product.price > 10 && product.price <= 80) return true;
            if (priceFilters['€ 80 - 200'] && product.price > 80 && product.price <= 200) return true;
            if (priceFilters['€ 200 - 400'] && product.price > 200 && product.price <= 400) return true;
            if (priceFilters['€ 400 - 900'] && product.price > 400 && product.price <= 900) return true;
            if (priceFilters['€ 900 - 1500'] && product.price > 900 && product.price <= 1500) return true;
            if (priceFilters['€ 1500 - 3000'] && product.price > 1500 && product.price <= 3000) return true;
            if (priceFilters['€3000- 5000'] && product.price > 3000 && product.price <= 5000) return true;
            if (priceFilters['More than € 5000'] && product.price > 5000) return true;
            return false;
        });
    };

    const getPriceFilterCounts = (products) => {
        const counts = {
            'Less than € 10': 0,
            '€ 10 - 80': 0,
            '€ 80 - 200': 0,
            '€ 200 - 400': 0,
            '€ 400 - 900': 0,
            '€ 900 - 1500': 0,
            '€ 1500 - 3000': 0,
            '€ 3000 - 5000': 0,
            'More than € 5000': 0,
        };

        products.forEach(product => {
            if (product.price < 10) counts['Less than € 10']++;
            else if (product.price >= 10 && product.price <= 80) counts['€ 10 - 80']++;
            else if (product.price > 80 && product.price <= 200) counts['€ 80 - 200']++;
            else if (product.price > 200 && product.price <= 400) counts['€ 200 - 400']++;
            else if (product.price > 400 && product.price <= 900) counts['€ 400 - 900']++;
            else if (product.price > 900 && product.price <= 1500) counts['€ 900 - 1500']++;
            else if (product.price > 1500 && product.price <= 3000) counts['€ 1500 - 3000']++;
            else if (product.price > 3000 && product.price <= 5000) counts['€ 3000 - 5000']++;
            else if (product.price > 5000) counts['More than € 5000']++;
        });

        return counts;
    };

    const handlePriceFilterChange = (filterKey) => {
        setPriceFilters(prevFilters => ({ ...prevFilters, [filterKey]: !prevFilters[filterKey] }));
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setSortVisible(false); // hide filter options after selection
    };

    const showByCateg = (category) => {
        setCategoryFilter(category);
        setFilterCategoryVisible(false)
    };

    const clearPriceFilters = () => {
        setPriceFilters({
            'Less than € 10': false,
            '€ 10 - 80': false,
            '€ 80 - 200': false,
            '€ 200 - 400': false,
            '€ 400 - 900': false,
            '€ 900 - 1500': false,
            '€ 1500 - 3000': false,
            '€ 3000- 5000': false,
            'More than € 5000': false,
        });
        setFilterPriceVisible(false);
    };

    const clearCategoryFilter = () => {
        setCategoryFilter('');
        setFilterCategoryVisible(false);
    };

    const applyPriceFilter = () => {
        setFilterPriceVisible(false)
    };

    const showPriceFilter = () => {
        setFilterPriceVisible(!filterPriceVisible);
        setFilterCategoryVisible(false);
    }

    const showCategoryFilter = () => {
        setFilterCategoryVisible(!filterCategoryVisible);
        setFilterPriceVisible(false);
    }

    return (
        <div className='flex flex-col items-end'>
            <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable theme="light" />

            <div className=' w-full lg:w-3/4 flex justify-between mt-4 md:mt-12 mb-2'>
                <div className='text-left ps-2 lg:ps-0 w-2/3'>
                    <p className='lg:text-2xl font-bold text-secondary-600 -mb-1'>
                        {filter.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} Items 
                    </p>
                    <DatePeriod />
                    {isSmallScreen && (
                        <div className='flex gap-2 items-center w-full'>
                            <p className='text-xs'>Filter by:</p>
                            <div className='relative' >
                                <button onClick={ showPriceFilter} className='flex items-center justify-center gap-1 shadow-md shadow-gray-400/50 h-full w-16 rounded md:rounded-lg '>
                                    <p className='text-xs md:text-sm xl:text-base'>Price</p> 
                                    <ChevronDownIcon className='w-3 md:w-4'/> 
                                </button>
                                {filterPriceVisible && (
                                    <div ref={filterRef} className='text-left text-black absolute z-40 bg-white w-44 flex flex-col justify-center py-1 rounded'>
                                        {Object.keys(priceFilters).map((filterKey, index) => (
                                            <div key={index} className='flex items-center gap-2 mt-2 cursor-pointer text-xs px-2'>
                                                <input type='checkbox' id={filterKey} checked={priceFilters[filterKey]}
                                                    onChange={() => handlePriceFilterChange(filterKey)}
                                                    className='text-black w-3 cursor-pointer'
                                                />
                                                <label className='text-black cursor-pointer text-xs' htmlFor={filterKey}>{filterKey}</label>
                                                <p className='text-gray-600'> ({priceFilterCounts[filterKey] ? priceFilterCounts[filterKey] : '0'}) </p>
                                                </div>
                                        ))}
                                        <div className='flex gap-1 mt-1 mx-auto'>
                                            <p onClick={clearPriceFilters} className='text-xs px-2 py-1 bg-primary-200 rounded-md'>Clear Filter</p>
                                            <p onClick={applyPriceFilter} className='text-xs px-2 py-1 bg-secondary-200 rounded-md'>Apply Filter</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button onClick={showCategoryFilter} className='flex items-center justify-center gap-1 shadow-md shadow-gray-400/50 h-full w-20 rounded md:rounded-lg '>
                                    <p className='text-xs md:text-sm xl:text-base'>Category</p> 
                                    <ChevronDownIcon className='w-3 md:w-4'/> 
                                </button>
                                {filterCategoryVisible && (
                                    <div className='flex flex-col gap-1 absolute z-40 bg-white w-44 items-start px-2 py-1 rounded'>
                                        {categories.map(item => (
                                            <div key={item} className='text-left'>
                                                <p className='cursor-pointer text-xs' onClick={() => showByCateg(item)} > {item.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </p>
                                            </div>
                                        ))}
                                        <p onClick={clearCategoryFilter} className='text-xs mt-1 px-2 py-1 bg-primary-200 rounded-md'>Clear Filter</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col md:flex-row items-center md:items-end justify-end md:w-1/2 md:gap-4 me-1 relative'>
                    <p className='text-gray-700 text-xs md:text-sm xl:text-base'>{filteredData.length} results</p>
                    <button onClick={() => setSortVisible(!sortVisible)} className='flex items-center justify-center md:gap-2 shadow-md shadow-gray-400/50 px-2 lg:px-0 h-1/3 md:h-3/4 w-full md:w-1/3 border-[1px] lg:border-2 border-secondary-500 rounded md:rounded-lg '>
                        <p className='text-xs md:text-sm xl:text-base'>Sort by Price</p> 
                        <ChevronDownIcon className='w-3 md:w-4'/> 
                    </button>
                    {sortVisible && (
                        <div ref={filterRef} className='absolute flex flex-col justify-end w-[110px] md:w-[140px] xl:w-[195px] rounded-lg top-11 shadow-xl bg-white lg:p-2 z-40'>
                            <button className='w-full text-xs sm:text-sm lg:text-base hover:bg-gray-200 hover:scale-100' onClick={() => handleSortChange("low-to-high")} >Low to High</button>
                            <button className='w-full text-xs sm:text-sm lg:text-base hover:bg-gray-200 hover:scale-100' onClick={() => handleSortChange("high-to-low")} >High to Low</button>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex w-full'>
                <div className='w-1/4 hidden lg:flex flex-col items-start justify-start gap-6'>
                    <div className='text-left text-black'>
                        <p className='text-xl font-bold text-secondary-600'>Filter by Price</p>
                        {Object.keys(priceFilters).map((filterKey, index) => (
                            <div key={index} className='flex items-center gap-2 mt-2 cursor-pointer '>
                                <input type='checkbox' id={filterKey} checked={priceFilters[filterKey]}
                                    onChange={() => handlePriceFilterChange(filterKey)}
                                    className='text-black w-4 h-4 cursor-pointer'
                                />
                                <label className='text-black cursor-pointer' htmlFor={filterKey}>{filterKey}</label>
                                <p className='text-gray-600'> ({priceFilterCounts[filterKey] ? priceFilterCounts[filterKey] : '0'}) </p>
                            </div>
                        ))}
                        <button onClick={clearPriceFilters} className=' w-3/4 py-1 mt-3 bg-primary-200 rounded-md'>Clear Price Filter</button>
                    </div>
                    <div className='text-left text-black'>
                        <p className='text-xl font-bold text-secondary-600 mb-2'>Filter by Category</p>
                        <div className='flex flex-col gap-1'>
                            {categories.map(item => (
                                <div key={item} className='text-left'>
                                    <p className='cursor-pointer' onClick={() => showByCateg(item)} > {item.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} </p>
                                </div>
                            ))}
                        </div>
                        <button onClick={clearCategoryFilter} className='w-full py-1 mt-3 bg-primary-200 rounded-md'>Clear Category Filter</button>
                    </div>
                </div>

                <div className='w-full lg:w-3/4'>
                    <Products products={filteredData} extendedStyle="flex flex-wrap justify-start gap-2" widthEach="p-2 w-[48%] sm:w-[32%] md:w-[24%] 2xl:w-[19%]" sliceStartIndex={0} numOfItem={filteredData.length} />
                </div>
            </div>
        </div>
    );
}
