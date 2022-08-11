import React from 'react'
import Cartitems from './cartitems'
import { useSelector } from 'react-redux'

export default function Cart() {
const itemsInCart = useSelector((state)=>state.cartslice.itemsincart)
  return (
    <div>
        {!itemsInCart.length && <p style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Cart is empty</p>}
        {itemsInCart.map((item)=><Cartitems key = { item.productId } name={item.name} price={item.price} count={item.count} productId={item.productId} totalPrice={item.totalPrice}/>)}
    </div>
  )
}
