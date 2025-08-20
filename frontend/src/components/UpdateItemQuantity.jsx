import useProductStore from "../store/productStore"
import  Button  from 'react-bootstrap/Button'
function UpdateItemQuantity({name}) {


    const increaseQuantity = useProductStore((state)=>state.increaseQuantity)
    const decreaseQuantity = useProductStore((state)=>state.decreaseQuantity)



      


  
  return (
   
     <div style={{ display:'flex' }}>
        <Button  style={{marginRight:'2px'}} variant="warning" onClick={()=>decreaseQuantity(name)} >-</Button>
    
        <Button style={{marginRight:'2px'}}  variant="warning"  onClick={()=>increaseQuantity(name)}>+</Button>
        </div>
       
  )
}

export default UpdateItemQuantity