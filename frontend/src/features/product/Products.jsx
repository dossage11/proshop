import React from 'react'
import { Row,Col } from 'react-bootstrap'

import ItemsList from "./ItemsList"
function Products({products}) {
  

  

  return (
    <Row xs={1} md={2} lg={3} className="g-3">

  
  {products.map((product) => (
    
<ItemsList product = {product} key={product._id}/>
  ))}
</Row>
  )
}

export default Products 