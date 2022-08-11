import React from 'react'
import Navbar from './Navbar'
import Cart from './Cart'
import Items from './Items'
import { useSelector } from 'react-redux'

export default function App() {
  const items=[{productId:'1',price:'7',name:'Item 1'},{productId:'2',price:'8',name:'Item 2'},{productId:'3',price:'10',name:'Item 4'}]
 const cartIsVisible = useSelector((state)=>state.ui.cartIsVisible);
  return (
    <div className='parent'>
      <Navbar />
      <div className='freespace'></div>
     {cartIsVisible && <Cart />}
    {items.map((item)=><Items key={item.productId} productId={item.productId} name={item.name} price={item.price} />)} 
    </div>
  )
}
