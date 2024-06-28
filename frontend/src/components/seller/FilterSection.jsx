import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import FilterItem from './FilterItem';

export default function FilterSection() {
    const user = useSelector(state => state.auth.user);
    const products = useSelector(state => state.products.products);
    const [allProducts, setAllProducts] = useState([]);
    const [isAvailable, setIsAvailable] = useState([]);
    const [outofstock, setOutofstock] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        const allFiltered = products.filter(item => item.author_id === user.uuid);
        setAllProducts(allFiltered);
    }, [user.uuid, products]);

    useEffect(() => {
        if (allProducts.length > 0) {
            const allAvailable = allProducts.filter(item => item.stock > 0);
            setIsAvailable(allAvailable);

            const allOutofstock = allProducts.filter(item => item.stock === 0);
            setOutofstock(allOutofstock);
        }
    }, [allProducts]);

    const data = [
        { label: "All", value: "all", count: allProducts.length },
        { label: "Active", value: "active", count: isAvailable.length },
        { label: "Out of Stock", value: "outofstock", count: outofstock.length },
        { label: "Pending Orders", value: "pendingorders", count: 0 }, // Update accordingly
        { label: "For Delivery", value: "fordelivery", count: 0 }, // Update accordingly
    ];

    const getFilteredData = (value) => {
        if (value === "all") return allProducts;
        if (value === "active") return isAvailable;
        if (value === "outofstock") return outofstock;
        return [];
    };

    const NoProductsYet = () => (
        <div className="text-center pt-24 py-4">
            <p>No products yet</p>
        </div>
    );

    return (
        <div className='w-full'>
            <Tabs value={activeTab} className="w-full">
                <TabsHeader className="rounded bg-transparent p-0"
                    indicatorProps={{ className: "bg-transparent border-b-4 border-secondary-500 rounded-none" }}>
                    {data.map(({ label, value, count }) => (
                        <Tab key={value} value={value} onClick={() => setActiveTab(value)} className={activeTab === value ? "text-secondary-500 font-bold" : "text-black"}>
                            <div className='flex pt-2'>
                                {label}
                                {count > 0 && (
                                    <div className='ml-2 -mt-3 relative'>
                                        <span className='absolute px-2.5 py-1 text-xs rounded-full bg-secondary-500 text-black'>{count}</span>
                                    </div>
                                )}
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody className='bg-white mt-4 rounded-xl shadow-lg min-h-[450px]'>
                    {data.map(({ value }) => (
                        <TabPanel key={value} value={value}>
                            {getFilteredData(value).length > 0 ? (
                                <FilterItem data={getFilteredData(value)} />
                            ) : (
                                <NoProductsYet />
                            )}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}
