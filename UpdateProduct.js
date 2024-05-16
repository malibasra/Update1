import { useState } from 'react'
import React from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
    const [image,setimage]=useState();
    const [productname,setproductname]=useState('');
    const [price,setprice]=useState('');
    const [updatename,setupdatename]=useState('');
    const navigate=useNavigate();
    const handleupload=(event)=>{
        const formdata=new FormData();
        formdata.append('image',image);
        formdata.append('productname', productname);
        formdata.append('price', price);
        formdata.append('updatename',updatename)
        axios.post('http://localhost:8081/updateproduct',formdata)
        .then(res=>{
            if(res.data==="Success"){
                navigate('/admin');
            }
            else{
                navigate('/updateproduct');
            }
        })
        .catch(err=>console.log(err));
    }
    function mainnavigate(){
        navigate('/main');
    }
  return (
    <div className='bg-primary-subtle text-center '>
        <Navbar/>
      <h1 onClick={mainnavigate}>Update the Product</h1>
      <div className='d-flex justify-content-center align-items-center pb-5'>
      <div className='p-3  w-25 bg-primary '>
        <form onSubmit={handleupload}>
        <div className='mb-3'>
                <label htmlFor='updatename'>Old Name</label>
                <input type='text' placeholder='Enter Old Name' className='form-control'
                onChange={e => setupdatename(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='productname'>Product Name</label>
                <input type='text' placeholder='Enter Product Name' className='form-control'
                onChange={e => setproductname(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='productprice'>Price</label>
                <input type='number' placeholder='Enter Product Price' className='form-control'
                onChange={e => setprice(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='img'>Image</label>
                <input type='file' name='image' placeholder='Select Image' className='form-control' onChange={e => 
                    setimage(e.target.files[0])} />
            </div>
            <button type='submit' className='btn btn-dark '>Update</button>
        </form>
      </div>
      </div>
    </div>
  )
}
