import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-tailwind/react';
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import './form.css';

export default function CustomInput({ type, label, name, register, errors, currencySymbol, value, ...validation }) {
    return (
        <div className='w-full text-left relative'>
            {type === 'radio' ? (
                <div className="flex items-center">
                    <input
                        type={type}
                        name={name}
                        value={value}
                        {...register(name, validation)}
                    />
                    <label className="ml-2 ">{label}</label>
                    {errors[name] && <span className='error-message flex gap-1'>{errors[name].message} <ExclamationCircleIcon className='w-3.5'/> </span>}
                    </div>
            ) : (
                currencySymbol ? (
                    <div className='symbol relative'>
                        <div className='relative rounded-md shadow-sm'>
                            <div className="absolute inset-y-0 left-0 flex items-center bg-gray-100 w-10 text-center object-cover">
                                <span className="text-gray-500 sm:text-sm mx-auto">{currencySymbol}</span>
                            </div>
                            <Input
                                type={type}
                                {...register(name, validation)}
                                label={label}
                                color='deep-orange'
                                className={`w-full block rounded-r-md placeholder-shown:border-deep-orange-100 placeholder-shown:border-t-deep-orange-100 ${currencySymbol ? 'border-l-0' : ''}`}
                            />
                        </div>
                        {errors[name] && <span className='error-message flex gap-1'>{errors[name].message} <ExclamationCircleIcon className='w-3.5'/> </span>}
                    </div>
                ) : (
                    <div className='relative'>
                        <Input
                            type={type}
                            {...register(name, validation)}
                            label={label}
                            color='deep-orange'
                            className={`w-full rounded-r-md placeholder-shown:border-deep-orange-100 placeholder-shown:border-t-deep-orange-100 ${currencySymbol ? 'border-l-0' : ''}`}
                        />
                        {errors[name] && <span className='error-message flex gap-1'>{errors[name].message} <ExclamationCircleIcon className='w-3.5'/> </span>}
                    </div>
                )
            )}
        </div>
    );
}

CustomInput.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object,
    currencySymbol: PropTypes.string,
    value: PropTypes.string
};
