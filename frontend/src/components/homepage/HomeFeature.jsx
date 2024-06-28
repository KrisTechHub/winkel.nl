import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import furnitureImg from '../../assets/banners/furniture1.jpg';
import skincareImg from '../../assets/banners/skincare3.jpg';

const featureData = [
    { 
        categ: "furniture",
        title: "Furniture Finds",
        subtitle: "Design your space, define your style",
        featureImg: furnitureImg,
    },
    {
        categ: "skincare",
        title: "Radiant Skincare",
        subtitle: "Revitalize with nature's touch.",
        featureImg: skincareImg,
    }
]

const FeatureItem = ({ items }) => {
    return (
        <div className='flex flex-row gap-2 md:gap-3'>
            {items.slice(0, 3).map((item, i) => (
                <div key={i} className='w-1/2 md:rounded-lg hover:drop-shadow-xl bg-white transition-hover duration-300 ease-in-out '>
                    <Link to={`/product/${item.uuid}`}>
                        <div className="overflow-hidden h-4/6 md:h-5/6 rounded">
                            <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover hover:scale-105 transition-scale duration-300 ease-in-out" />
                        </div>

                        <div className="flex flex-col pt-1 ps-2 h-2/6 overflow-hidden">
                            <p color="blue-gray" className="text-xs md:text-[13px] lg:text-[15px]  max-h-4 lg:max-h-8 overflow-hidden" >
                                {item.title.length > 24 ? item.title.slice(0, 24) + '...' : item.title}
                            </p>
                            <div className="flex text-black gap-1 items-center">
                                <p className='text-xs md:text-[14px] lg:text-lg font-bold'>{item.price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })} </p>
                                <p className='text-[9px] md:text-[10px] border-[1px] border-black px-1'>-{Math.round(item.discount)}%</p>
                            </div>                        
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default function HomeFeature ({ data }) {
    const [ skincare, setSkincare ] = useState([]);
    const [ furniture, setFurniture ] = useState([]);

    useEffect(() => {
        if (data) {
            const isFurniture = data.filter(item => item.category === "furniture");
            const isSkincare = data.filter(item => item.category === "skincare");
            setSkincare(isSkincare);
            setFurniture(isFurniture);
        }

    }, [data]);


    return (
        <div className='py-10 text-left'>
            <span className='text-[8px] sm:text-xs md:text-sm lg:text-base font-bold bg-black text-white rounded mb-4 p-1 border-[1px] border-black px-2 lg:px-4 tracking-widest'>TOP PICKS </span>
            <div className='flex flex-col text-left mt-1 md:mt-3'>
                {featureData.map((data, index) => (
                    <div key={index} className=''>
                        <div className=''>
                            <p className='text-sm md:text-lg lg:text-xl font-bold'> {data.title} </p>
                            <p className='text-xs lg:text-sm text-gray-600 tracking-wider'> {data.subtitle} </p>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2 md:gap-6 py-1 md:py-5'>
                            <img className='h-40 sm:h-72 md:h-full md:w-1/2 object-cover rounded' src={data.featureImg} alt="" />
                            <FeatureItem items={data.categ === "skincare" ? skincare : furniture} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

FeatureItem.propTypes = {
    items: PropTypes.array,
}

HomeFeature.propTypes = {
    data: PropTypes.array,
}