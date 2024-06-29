import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Typography } from '@material-tailwind/react';
import { ProductService } from '../../../services/products';
import { toast } from 'react-toastify';
import CustomInput from './CustomInput';
import bannerImg from '../../assets/form/happy.jpg';



export default function Update () {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [ images, setImages ] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);


    useEffect(() => {
        const fetchProduct = async () => {
            const data = await ProductService(uuid);
            if (data) {
                // Set form values using setValue method from RHF
                Object.entries(data).forEach(([key, value]) => setValue(key, value));
                // setValue('thumbnail', data.thumbnail)
                // setValue('images', data.images);
                setImages(JSON.parse(data.images))
            }
        };
        fetchProduct();
    }, [uuid, setValue]);

    const handleImageDelete = (item) => {
        setImagesToDelete((prev) => 
            prev.includes(item) ? prev.filter((img) => img !== item) : [...prev, item]
        )
    };

    const handleUpdate = async (data) => {
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

        // Appending files correctly
        if (data.thumbnail && data.thumbnail[0]) {
            formData.append('thumbnail', data.thumbnail[0]);
        }

        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }
        }

        formData.append('imagesToDelete', JSON.stringify(imagesToDelete));

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        try {
            await axios.put(`${process.env.VITE_SERVER}/products/${uuid}`, formData, config);
            toast.success("Product details updated successfully!");
            navigate(`/product/${uuid}`);
        } catch (err) {
            console.error("Error updating product:", err.response || err.message);
            alert("Updating product details has failed. Please try again.")
        }
    };

    return (
        <div className='flex flex-col justify-center items-center text-center'>
            <div className='w-4/6 h-[120vh]  flex flex-col justify-start items-center relative'>
                <div className='h-96 overflow-hidden relative top-0'>
                    <Typography className='text-secondary-700 font-bold text-3xl absolute left-[40%] top-12'>Happy selling!</Typography>
                    <img className='w-full object-cover' src={bannerImg} alt="" />
                </div>

                <div className='w-4/6 my-10 items-center absolute top-64'>
                    <form onSubmit={handleSubmit(handleUpdate)} noValidate encType='multipart/form-data'>
                        <div className="flex flex-col items-center w-full bg-white rounded-lg pb-16 py-10">
                            <div className="w-4/6 flex flex-col items-center gap-8">
                                <Typography className='text-secondary-700 font-bold text-3xl'>Update Product</Typography>

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
                                    <label className='text-[14px] text-gray-700 ' htmlFor="thumbnail">Change product thumbnail</label>
                                    <input type="file" id='thumbnail' {...register('thumbnail', { required: false })} className='h-10 cursor-pointer text-[14px] text-gray-700 rounded-lg border-[1px] border-primary-300'/>
                                    {errors.thumbnail && <span className='text-xs text-red-500'>Product thumbnail is required</span>}
                                </div>

                                <div className='flex flex-col justify-center items-left text-left gap-1 w-full'> 
                                    <label className='text-[14px] text-gray-700 ' htmlFor="images">Add more product images</label>
                                    <input multiple type="file" id='images' {...register('images', { required: false })} className='h-10 cursor-pointer text-[14px] text-gray-700 rounded-lg border-[1px] border-primary-300'/>
                                    {errors.images && <span className='text-xs text-red-500'>Product images are required</span>}
                                </div>

                                <div className='w-full grid grid-cols-2 gap-4'>
                                    {images.map((item, index) => (
                                        <div key={index} className=''>
                                            <img src={item} width={250}/>
                                            <input 
                                                type="checkbox" 
                                                checked={imagesToDelete.includes(item)} 
                                                onChange={() => handleImageDelete(item)}
                                            />
                                            <label>Delete</label>
                                        </div>    
                                    ))}
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
            </div>
        </div>
    );
}