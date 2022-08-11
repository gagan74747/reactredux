import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { uiactions } from './reducers/uislice'
import { cartsliceactions } from './reducers/cartslice'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const totalCartLength = useSelector((state)=>state.cartslice.totallength);
  const dispatch = useDispatch();
  const fetchData = async () => {
 const firstPromise = fetch("http://localhost:5000/getAllItems").then((data) =>
   data.json()
 );
 const secondPromise = fetch("http://localhost:5000/totalItemsInBag").then(
   (data) => data.json()
 );

 const allPromises = await Promise.all([firstPromise, secondPromise]);
 const fetchedData = {itemsInCart:allPromises[0].data,totalItemsInBag:allPromises[1].data[0].totalItemsInBag}
 dispatch(cartsliceactions.fetchedData(fetchedData))

    }
   useEffect( ()=>{
    
   fetchData();


   },[])
  return (
    <div>
        <div className='navbar'>
            <div>ReduxCart</div>
            <div><span onClick = {()=>dispatch(uiactions.toggle())}>My Cart <span style={{borderRadius:'10px',backgroundColor:'green',color:'white',maxWidth:'50px'}}>{totalCartLength}</span></span></div>
        </div>
      
    </div>
  )
}
