import React from 'react'
import { Card, Col,Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Rating from '../../components/Rating'
function Itemlist({product}) {

   
    const {_id,name,numReviews,price,image,rating} = product
  return (
  <Col key={_id} className="mb-3">


     <Card className='my-3 p-3 rounded'>
      <NavLink to={`/product/${_id}`} >
            <Card.Img variant="top" src={image} />
      </NavLink>
      <Card.Body>
        <NavLink to={`/product/${_id}`} >
          <Card.Title>{name} </Card.Title>
        </NavLink>
      

      <Card.Text>
        <Rating value={rating} text={`${numReviews} reviews`} />
      </Card.Text>
        {/* <Card.Text as="div">
          <div className='my-3'>
            {description.length > 100 ? `${description.substring(0, 100)}...` : description}
          </div>
          </Card.Text> */}
        <Card.Text>${price}</Card.Text>
      
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
   
    </Col>
  )
}

export default Itemlist