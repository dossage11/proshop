import React, { useEffect } from 'react'
import useProductStore from '../../store/productStore';
import { Alert, Button, NavLink } from 'react-bootstrap';
import CartList from './CartList';
import { formatNumber } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';



function CartItem() {

      const { products,totalAmount,totalCartPrice,selectedItemList } = useProductStore();
 const navigate =  useNavigate()

  useEffect(()=>{
      totalAmount()
  },[totalCartPrice,selectedItemList])


  

      if (products.length === 0 ) {
        return <div><Alert variant='danger'>Your cart is empty.</Alert></div>;
      }
    

  function handleCheckout(){

  navigate('/shipping')
  }

  const isNotEmpty = selectedItemList.length ===0


 console.log(isNotEmpty);
 
  return (
    <div>
        {products.map((product) => (
 
   <CartList key={product.name} product = {product} />

))}
 { products?
<div style={{  
  display: 'flex', 
  flex: 1, 
  justifyContent: 'flex-end',    // Changed from 'center' to 'flex-end'
  alignItems: 'flex-end',        // Changed from 'alignContent' to 'alignItems'
  flexDirection: 'column', 

  marginTop: '5rem', 
  gap: '10px'      }}>

<h5 >Total Price: ${formatNumber(totalCartPrice) }</h5>

<Button disabled={isNotEmpty}  onClick={()=> handleCheckout()}>Checkout</Button>
</div>
:null}
    </div>
  )
}

export default CartItem