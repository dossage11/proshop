import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Row } from 'react-bootstrap'
import CheckoutSteps from '../../components/CheckoutSteps'
import useProductStore from '../../store/productStore'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export const PaymentForm = () => {

  const navigate = useNavigate();
 const {PaymentMethod,paymentMethod} = useProductStore();

 const [payment,setPayment]= useState('')

 const handlePaymentMethodChange = (e) => {

   PaymentMethod(e.target.value);
 };




 const handleSubmit = (e) => {
  e.preventDefault();

  if (!paymentMethod) {
    toast.error('Please select a payment method');
    return;
  }
  // PaymentMethod(payment);
 navigate('/placeorder')
 };
  



  return (
         <Container className='mt-5' >
         <CheckoutSteps step1 step2 step3/>
        <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <CardHeader>
              <h4 className="mb-0">Payment Method</h4>
            </CardHeader>
            <CardBody>
              <p>Please select your payment method below:</p>
              {/* Add form fields for payment information here */}
              <Form onSubmit={handleSubmit}>
              

             
              <Col >
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="PayPal or Credit Card"
                    name="paymentMethod"
                    id="PayPal"
                    value="PayPal"
                    onChange={(e) => handlePaymentMethodChange(e)}
                    checked={paymentMethod === "PayPal"} 
                  />
                  <Form.Check
                    type="radio"
                    label="Stripe"
                    name="paymentMethod"
                    id="Stripe"
                    value="Stripe"
                    onChange={(e) => handlePaymentMethodChange(e)}
                    checked={paymentMethod === "Stripe"}
                  />
                </Form.Group>
              </Col>

              <Button variant="primary" className="mt-3" type="submit">
                    Submit
                  </Button>
           
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}
