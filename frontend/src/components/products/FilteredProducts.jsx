import React, { useEffect, useState } from 'react';
import FlashDeals from '../homepage/FlashDeals';
import { ProductsService } from '../../../services/products';

export default function FilteredProducts () {
    const [ filteredData, setFilteredData ] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const data = await ProductsService();
            if (data) {
                setFilteredData(data)
            }
        };

        fetchProducts();
    })

    console.log(filteredData);
    return (
        <div>
            <FlashDeals data={filteredData} />
        </div>
    );
}