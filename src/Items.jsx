import React from 'react'
import { useDispatch } from 'react-redux'
import { cartsliceactions } from './reducers/cartslice'
import axios from 'axios'

export default function Items({productId,name,price}) {

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:5000/addToCart", {
        productId: +productId,
        price: +price,
        name,
      });
      dispatch(cartsliceactions.addtocart({ productId, name, price }));
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const dispatch = useDispatch()
  return (
    <div  className='item-container'>
      <div>{name}(${price}.00/item)</div>
      <button className='addtocart' onClick ={handleAddToCart}>Add To Cart</button>
    </div>
  )
}
