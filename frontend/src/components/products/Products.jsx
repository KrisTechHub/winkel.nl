import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import NewFavorite from '../users/NewFavorite';
import AddToCart from '../users/AddToCart';
import ProductRating from '../reviews/ProductRating';

export default function Products ({products, extendedStyle, sliceStartIndex, numOfItem, widthEach}) {
        
    return (
        <div className={`${extendedStyle}`}>
        {products.slice(sliceStartIndex, numOfItem).map((product) => (
          <div key={product.uuid} className={`${widthEach} h-[300px] md:h-[320px] my-2 rounded-2xl md:rounded-lg hover:drop-shadow-xl bg-gray-100 transition-hover duration-300 ease-in-out`}>
            <Link to={`/product/${product.uuid}`} >
            {/* to={`/product/${product.uuid}`} */}
            
              {/* PRODUCT IMAGE */}
              <div className="overflow-hidden h-4/5 md:h-[78%] rounded-t-2xl md:rounded-t-lg">
                  <img src={product.thumbnail} alt={product.title} className=" h-full w-full object-cover hover:scale-105 transition-scale duration-300 ease-in-out" />
              </div>
  
              {/* PRODUCT DETAILS */}
              <div className="flex flex-col mx-1 pt-1 h-2/5 md:h-[22%] overflow-hidden text-left">
                  <Typography color="blue-gray" className="text-sm md:text-[15px] max-h-8 -mb-1 " >
                    {product.title.length > 20 ? product.title.slice(0, 20).replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) + ' ' : product.title.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                  </Typography>
                  <ProductRating productId={product.uuid} size={16} fontSize={"text-xs"}/>
                  <div className='flex justify-between -my-2'>
                      <div className="flex text-black gap-2 items-center">
                        <Typography className='text-lg font-bold'>{product.price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} </Typography>
                        <Typography className='text-[10px] md:text-xs text-red-500 border-[1px] border-red-500 px-1'>-{Math.round(product.discount)}%</Typography>
                      </div>
                      <div className='flex items-center gap-1'>
                        <AddToCart btnType='icon' productId={product.uuid} />
                        <NewFavorite btnType='icon' productId={product.uuid} iconClass={"w-5 h-5"} />
                      </div>
                  </div>
              </div>
              
            </Link>
          </div>
        ))}
      </div>
    );
}

Products.propTypes = {
    products: PropTypes.array,
    extendedStyle: PropTypes.string,
    numOfItem: PropTypes.number.isRequired,
    sliceStartIndex: PropTypes.number.isRequired,
    widthEach: PropTypes.string
}