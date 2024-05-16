import React from 'react';

import Navbar from './Navbar';
import Slider from './Slider';
import Footer from './Footer';
import Category from './Category';

export default function Main() {
  return (
    <div className='fst-italic text-center bg-primary-subtle'>
      <Navbar />
      <h1>Welcome to <strong>V CART!</strong></h1>
      <Slider />
      <div className="container">
        <h2>Category</h2>
      </div>
      <Category/>
      <Footer/>
    </div>
  )
}