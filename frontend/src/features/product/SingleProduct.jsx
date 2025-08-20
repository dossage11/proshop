
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Button, Card, Col, ListGroup, Row,Form } from 'react-bootstrap';
import Rating from '../../components/Rating';
import { getProductById } from '../../hooks/useProducts';
import  useProductStore from '../../store/productStore';
import Loader from '../../components/Loader';

import { useState } from 'react';

function SingleProduct() {
  const navigate = useNavigate();
  const {id} =  useParams()
  
  const { data: product, isLoading, error } = getProductById(id);
  const { addProduct,products,increaseQuantity } = useProductStore();

  const [qty, setQty] = useState(1);


  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>Error loading product.</div>;
  if (!product) return <div>No product found.</div>;

      const {image,name,numReviews,rating,price,description,countInStock} = product
   
// const [qty, setQty] = useState(countInStock > 0 ? 1 : 0);


   const isInCartList = products?.map((item) => item.name).includes(name);



    function handleAddToCart() {
      // Logic to add the product to the cart


      const newItem = {
        image,
        name,
        numReviews,
        rating,
        price,
        description,
        countInStock,
        quantity: Number(qty),
        totalPrice: qty * price
      }

      
      isInCartList ? increaseQuantity(name) : addProduct(newItem);


  
      // addProduct(newItem);
     // Get updated products after adding the new item
      navigate('/cart');

    }

  return (
    <><Link className='btn btn-dark my-3' to={'/'}>Go Back</Link>
    <Row>
      <Col md={6}>
        <img src={image} alt={name} className='img-fluid' />
      </Col>
      <Col md={3}>
      <ListGroup>
        <ListGroup.Item>

        <h3>{name}</h3>
      
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </ListGroup.Item>
            <ListGroup.Item>
              Price: ${price}
            </ListGroup.Item>
                <ListGroup.Item>
              Description: {description}
                </ListGroup.Item>
      </ListGroup>
      </Col>
      <Col md={3}>
     
        <Card border="danger" style={{ width: '18rem' }}>
          <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                   {countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Quantity:</Col>
                  <Col>
                  <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                   { [...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>

                <Button style={{ width: '100%' }} className='btn-block' disabled={countInStock === 0} onClick={handleAddToCart}>Add to Cart</Button>
               </ListGroup.Item>
          </ListGroup>
          </Card>
      </Col>
      </Row></>
  )
}

export default SingleProduct