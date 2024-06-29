import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import CustomInput from './CustomInput';


export default function ValidatedForm () {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = useSelector(state => state.auth.user) 


    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('color', data.color);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('discount', data.discount);
        formData.append('size', data.size);
        formData.append('stock', data.stock);
        formData.append('brand', data.brand);
        formData.append('category', data.category);
        formData.append('location', data.location);
        formData.append('author_id', user.uuid);
        formData.append('author_name', user.firstname + user.lastname);

        if (data.thumbnail[0]) {
            formData.append('thumbnail', data.thumbnail[0]);
        }

        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        try {
            const response = await axios.post(`${process.env.VITE_SERVER}/products`, formData, config);
            console.log('responsedata', response.data);
            toast.success("Product has been added successfully!");
            navigate('/');
        } catch (err) {
            toast.error(err)
        }
    };

    return (
        <div className='w-full items-center z-40 drop-shadow-xl mb-8'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate encType='multipart/form-data'>
                <div className="flex flex-col items-center w-full bg-white rounded-lg  lg:py-10">
                    <div className="w-4/6 flex flex-col items-center gap-8">
                        <Typography className='text-secondary-700 font-bold text-xl lg:text-3xl'>New Product</Typography>

                        <CustomInput type="text" label="Product name" name="title" {...{required: 'Product name is required'}} register={register}  errors={errors} />
                        <CustomInput type="text" label="Product description" name="description" {...{required: 'Product description is required', minLength: { value: 5, message: "Description must be at leatst 100 characters"} }} register={register}  errors={errors} />

                        <div className='w-full flex gap-4 '>
                            <CustomInput type="number" label="Price" name="price" currencySymbol="€" {...{required: 'Price is required', min: { value: 1, message: "Price must be greater than 0"} }} register={register}  errors={errors} />
                            <CustomInput type="number" label="Discount" name="discount" currencySymbol="%" {...{required: 'Discount is required. If none, input 0.' }} register={register}  errors={errors} />
                        </div>

                        <div className="w-full flex gap-2">
                            <CustomInput type="text" label="Size" name="size" {...{required: 'Size is required' }} register={register}  errors={errors} />
                            <div className='w-1/3 flex justify-center items-center gap-1'> 
                                <label className='text-[14px] text-gray-700' htmlFor="color">Color:</label>
                                <input type="color" {...register('color', { required: true })}/>
                                {errors.color && <span className='error-message'>Color is required</span>}
                            </div>
                            <CustomInput type="number" label="Number of stocks" name="stock" {...{required: 'Stocks is required' }} register={register}  errors={errors} />
                        </div>

                        <div className="flex w-full gap-4">
                            <CustomInput type="text" label="Brand" name="brand" {...{required: 'Brand is required' }} register={register}  errors={errors} />
                            <CustomInput type="text" label="Category" name="category" {...{required: 'Category is required' }} register={register}  errors={errors} />
                        </div>

                        <CustomInput type="text" label="Location" name="location" {...{required: 'Location is required' }} register={register}  errors={errors} />

                        <div className='flex flex-col justify-center items-left text-left gap-1 w-full'> 
                            <label className='text-[14px] text-gray-700 ' htmlFor="thumbnail">Upload product thumbnail</label>
                            <input type="file" id='thumbnail' {...register('thumbnail', { required: true })} className='h-10 cursor-pointer text-[14px] text-gray-700 rounded-lg border-[1px] border-primary-300'/>
                            {errors.thumbnail && <span className='text-xs text-red-500'>Product thumbnail is required</span>}
                        </div>

                        <div className='flex flex-col justify-center items-left text-left gap-1 w-full'> 
                            <label className='text-[14px] text-gray-700 ' htmlFor="images">Upload product images</label>
                            <input multiple type="file" id='images' {...register('images', { required: true })} className='h-10 cursor-pointer text-[14px] text-gray-700 rounded-lg border-[1px] border-primary-300'/>
                            {errors.images && <span className='text-xs text-red-500'>Product images are required</span>}
                        </div>

                        <div className='w-full flex gap-6'>
                            <button className=' bg-primary-100 font-bold'>
                                <Link to={'/'} >
                                    Back
                                </Link>
                            </button>
                            <button className='bg-secondary-500 font-bold' type='submit'>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}