import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Comm/Navbar';

export default function Bakery() {
  const [image, setImage] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:8081/product')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setImage(response.data);
        } else {
          console.log('Error: Image data is not an array');
        }
      })
      .catch((error) => {
        console.log('Error fetching images: ', error);
      });
  }, []);

  return (
    <div>
      <Navbar/>
        <div className='fst-italic text-center  bg-primary-subtle vh-150'>
        <h1 style={{ fontSize: '100px' }}>Bakery Items</h1>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center">
          {image.filter(image => image.ProductCategoryFID === 1).length > 0 ? (
            image.filter(image => image.ProductCategoryFID === 1).map((image, index) => (
              <div key={index} className="col-md-3 col-sm-6 col-12">
                <div className="card " style={{ width: '35vh',height:'40vh', margin: '20px', padding:'25px'}}>
                  <img src={'http://localhost:8081/product/' + image.ProductPic} className="card-img-top" alt="..." 
                       style={{ height: '100%', objectFit: 'cover', cursor: 'pointer', width: '100%', maxHeight: 
                        '150px' }} />
                  <div className="card-body" style={{ padding: '5px' }}>
                    <h5 className="card-title" style={{ fontSize: '14px' }}>{image.ProductName}</h5>
                    <p className="card-title" style={{ fontSize: '10px' }}>{image.ProductPrice}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12 text-center">
              <h5>No products available in this category</h5>
            </div>
          )}
        </div>
      </div>
    </div>
      
    </div>
  )
}