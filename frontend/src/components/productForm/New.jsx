import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export default function New () {
    const navigate = useNavigate();
    const [ inputs, setInputs ] = useState({ title: '' , description: '', price: '', location: '', color: '', size: '', brand: '', category: '', 
        stock: '', discount: '',  thumbnail: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/product", inputs)
            .then(res => {
                alert("Product has been added successfully!")
                navigate('/products');
            })
            .catch (err => {
                alert(err)
            })
    }

    console.log(inputs);

    return (
        <div>
            <h1>Add product</h1>
            <div className='register-form'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='input-container'> 
                        <label htmlFor="title">title</label>
                        <input type="text" name='title' value={inputs.title} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="description">description</label>
                        <input type="text" name='description' value={inputs.description} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="price">price</label>
                        <input type="number" name='price' value={inputs.price} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'> 
                        <label htmlFor="location">location</label>
                        <input type="text" name='location' value={inputs.location} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="color">color</label>
                        <input type="color" name='color' value={inputs.color} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="size">size</label>
                        <input type="text" name='size' value={inputs.size} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="brand">brand</label>
                        <input type="text" name='brand' value={inputs.brand} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'> 
                        <label htmlFor="category">category</label>
                        <input type="text" name='category' value={inputs.category} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="stock">stock</label>
                        <input type="number" name='stock' value={inputs.stock} onChange={handleChange} required />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="discount">discount</label>
                        <input type="number" name='discount' value={inputs.discount} onChange={handleChange} required/>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="thumbnail">thumbnail</label>
                        <input type="text" name='thumbnail' value={inputs.thumbnail} onChange={handleChange} required/>
                    </div>


                    <div>
                        <button type='submit'>Submit</button>
                    </div>

                </form>

                <Link to={'/'}>
                    <button>Back</button>
                </Link>
            </div>
        </div>
    );
}