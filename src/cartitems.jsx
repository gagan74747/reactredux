import React from "react";
import { useDispatch } from "react-redux";
import { cartsliceactions } from "./reducers/cartslice";
import axios from "axios";

export default function Cartitems({ name, price, count, productId, totalPrice }) {
  const handleRemoveFromCart = async () => {
    try {
         await axios.post(
        "http://localhost:5000/removeFromCart",
        { productId: +productId, price: +price }
      );
      dispatch(cartsliceactions.removefromcart({ productId }));
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const handleAddToCart = async () =>{
    try{
      await axios.post(
        "http://localhost:5000/addToCart",
        { productId: +productId, price: +price,name }
      );
      dispatch(cartsliceactions.addtocart({ productId, name, price }))
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const dispatch = useDispatch();
  return (
    <div>
      <div className="cart">
        <div>Your Shopping Cart</div>
        <div className="cart-items">
          <div>{name}</div>
          <div>
            {totalPrice}
            <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
              (${price}.00/item)
            </span>
          </div>
          <div>x{count}</div>
          <div>
            <span onClick={handleRemoveFromCart}>-</span>
            <span
              onClick={handleAddToCart
               }
            >
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
