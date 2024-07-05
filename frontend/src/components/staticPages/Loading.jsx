import React, { CSSProperties } from 'react';
import logo from '../../assets/logo.svg'
import RiseLoader from "react-spinners/RiseLoader";

export default function Loading () {
      
    return (
        <div className="lg:container m-auto pt-[53px] lg:pt-[115px] overflow-hidden flex flex-col items-center justify-center h-[50vh] lg:h-[90vh] ">

        <RiseLoader
                color={'#ff7d26'}
                loading={true}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <img src={logo} alt="logo" className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 drop-shadow-2xl' />
            <RiseLoader
                color={'#ff7d26'}
                loading={true}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}