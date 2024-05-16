import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Admin() {
  return (
    <div className='bg-primary-subtle text-center '>
      <Navbar/>
      <h1>Hello <strong>Admin </strong>you can Edit</h1>
      <h3 className='my-5'>You can only Edit Product.</h3>
      <div className='d-flex pb-5 justify-content-center align-items-center'>
      <div className=' w-25 bg-info'>
      <Link className="btn btn-outline-dark my-3" to='/Product' role="button">Add Product</Link>
      <Link className="btn btn-outline-dark mx-5 my-3" to='/Updateproduct' role="button">Update Product</Link>
      <Link className="btn btn-outline-dark mx-5 my-3" to='/product' role="button">Delete Product</Link>
      <Link className="btn btn-outline-dark mx-5 my-3" to='/register' role="button">Edit Staff</Link>
    </div>
    </div>
    </div>
  )
}

