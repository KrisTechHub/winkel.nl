import React from 'react';

export default function DatePeriod () {
    const getFormattedDate = (date) => {
        return date.toLocaleDateString('en-NL', {
            month: 'long',
            day: 'numeric',
        });
    };

    const getSalePeriod = () => {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        
        return `${getFormattedDate(today)} - ${getFormattedDate(nextWeek)}`;
    };

    return (
        <p className='text-gray-700 text-[11px] lg:text-sm italic tracking-wider font-bold'> {getSalePeriod()} </p>
    );
}