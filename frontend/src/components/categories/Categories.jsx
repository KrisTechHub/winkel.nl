import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { ProductsService } from '../../../services/products';


export default function Categories ({customizedFont}) {
    const [data, setData] = useState([]);

    useEffect(() => {

      const getData = async() => {
        const fetchData = await ProductsService();
        if (fetchData) {
          setData(fetchData)
        }
      };

      getData();
    })

    return (
        <div className='container w-40 font-PoppinsLight tracking-tight'>
            <div className="flex flex-col text-left gap-1">
                {Array.from(new Set(data.map(product => product.category))).map(category => (
                    <div key={category}>
                        <Link to={`/category/${category}`}>
                          <p className={`${customizedFont} text-gray-700 hover:text-gray-800`}>{category.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
}


Categories.propTypes = {
  customizedFont: PropTypes.string
}