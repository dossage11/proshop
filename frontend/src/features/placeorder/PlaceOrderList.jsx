
import useProductStore from '../../store/productStore'
import CheckoutSteps from '../../components/CheckoutSteps';
import { Container, ListGroup, Row,Col,Card, Button } from 'react-bootstrap';
import { formatNumber } from '../../utils/helpers';
import { useEffect } from 'react';
function PlaceOrderList() {
  const { selectedItemList, shippingAddress,paymentMethod,totalCartPrice,totalAmount } = useProductStore();
 

  useEffect(()=>{
      totalAmount()
  },[totalCartPrice,selectedItemList])


  

  console.log("Total Price:",totalCartPrice);
  

  const shippingFee = totalCartPrice > 500 ? (totalCartPrice * 0.01) : (totalCartPrice * 0.15);

  const tax = totalCartPrice * 0.1;
  const total = totalCartPrice + shippingFee + tax;

  console.log(selectedItemList);
  

  return (
    <Container className='mt-5'>
        <CheckoutSteps step1 step2 step3 step4 />
        
        <Row>
          <Col>
          <ListGroup>
            <ListGroup.Item>

               {/* Shipping Section */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h5>Shipping</h5>
              <p>
                <strong>Address:</strong> {shippingAddress[0].address}, {shippingAddress[0].city}, {shippingAddress[0].postalCode}, {shippingAddress[0].country}
              </p>
            </Card.Body>
          </Card>
             
            </ListGroup.Item>
            <ListGroup.Item>

     <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
                <h5>Payment Method</h5>
              <strong>Method:</strong> {paymentMethod}
            </Card.Body>
          </Card>

        
            </ListGroup.Item>
            <ListGroup.Item>
              
              {selectedItemList.length === 0 ? (
                <p>Your cart is empty</p> ) : (
                <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="text-uppercase fw-bold text-muted mb-4" style={{ fontSize: '14px', letterSpacing: '1px' }}>
                ORDER ITEMS
              </h5>
              
              {selectedItemList.map((item) => (
                <Row key={item.id} className="align-items-center mb-3 pb-3 border-bottom">
                  <Col xs={2}>
                    <div 
                      className="bg-light rounded d-flex align-items-center justify-content-center"
                      style={{ width: '50px', height: '50px', fontSize: '20px' }}
                    >
                      <img  src={item.image} alt={item.name} style={{ objectFit: 'cover', width: '50px', height: '50px' }} />
                    </div>
                  </Col>
                  <Col xs={7}>
                    <p className="mb-0 fw-medium" style={{ fontSize: '14px' }}>
                      {item.name}
                    </p>
                  </Col>
                  <Col xs={3} className="text-end">
                    <span className="text-muted me-2" style={{ fontSize: '14px' }}>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </span>
                    <span className="fw-medium" style={{ fontSize: '14px' }}>
                      = ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </Col>
                </Row>
              ))}


              
            </Card.Body>
          </Card>
              )}
            </ListGroup.Item>

            <ListGroup.Item>





             <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="text-uppercase fw-bold text-muted mb-4" style={{ fontSize: '14px', letterSpacing: '1px' }}>
                ORDER SUMMARY
              </h5>

               <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '14px' }}>Items</span>
                <span style={{ fontSize: '14px' }}>${formatNumber(totalCartPrice)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span style={{ fontSize: '14px' }}>Shipping</span>
                <span style={{ fontSize: '14px' }}>${formatNumber(shippingFee)}</span>
              </div>

              <div className="d-flex justify-content-between mb-4">
                <span style={{ fontSize: '14px' }}>Tax</span>
                <span style={{ fontSize: '14px' }}>${formatNumber(tax)}</span>
              </div>

              <hr className="border-gray-200 my-4" />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-medium">Total</span>
                <span className="fw-medium">${formatNumber(total)}</span>
              </div>

              <Button
              
                size="lg"
                className="w-100 text-uppercase fw-medium"
                style={{ fontSize: '14px', letterSpacing: '1px', padding: '12px' }}
              >
                PLACE ORDER
              </Button>
            </Card.Body>
          </Card>
        </Col>
                    </ListGroup.Item>
          </ListGroup>
          </Col>
        </Row>
    
    </Container>
  )
}

export default PlaceOrderList