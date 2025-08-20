import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import UpdateItemQuantity from "../../components/UpdateItemQuantity"
import useProductStore from '../../store/productStore';
import { formatNumber, idString } from '../../utils/helpers';


function CartList({product}) {

      const { products, removeProduct,toggleItem,selectedItemList,totalAmount } = useProductStore();
   const { name, image, quantity, totalPrice } = product;

  const isInCartList = products.map((item) => item.name).includes(name)
  const isChecked =  selectedItemList.map((item)=>item.name).includes(name)


  
 
      function handleRemoveProduct(name) {
        // Logic to remove the product from the cart

          removeProduct(name)

      }

      function handleSelectedItem(name){
        toggleItem(name)
      
      }
 
    
  return (
    <>
   <div
  
  style={{
    display: 'flex',
    
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    gap: '2rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  }}
  >

        <div  className="mb-3">
          <Form.Check  onChange={()=>handleSelectedItem(name)}// prettier-ignore
            type={'checkbox'}
            id={`default-${idString(name)}`}
            checked={isChecked}
            
          />

         
        </div>

    <div style={{ display: 'flex', flex: 1 , alignItems: 'center', gap: '2rem', minWidth: '200px' }}>
      <img  src={image} alt={name} style={{ objectFit: 'cover', width: '120px', height: '120px' }} />
      <div>{name}</div>
    </div>
    <div style={{ minWidth: '60px', textAlign: 'center' }}>{quantity}x</div>
    <div style={{ minWidth: '80px',flex: 1  ,textAlign: 'left' }}>${formatNumber(totalPrice)}</div>
    {isInCartList &&  <UpdateItemQuantity name={name} />}
    <Button variant='danger' onClick={() => handleRemoveProduct(name)}>Remove from Cart</Button>


  </div>


    </>
  )
}

export default CartList