import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Row } from 'react-bootstrap'
import CheckoutSteps from '../../components/CheckoutSteps'
import useProductStore from '../../store/productStore'
import toast from 'react-hot-toast'
export const PaymentForm = () => {
 const {PaymentMethod} = useProductStore();

 const [payment,setPayment]= useState('')

 const handlePaymentMethodChange = (e) => {
  setPayment(e.target.value);

 };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!payment) {
    toast.error('Please select a payment method');
    return;
  }
  PaymentMethod(payment);
  setPayment('');
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
                    label="Credit Card"
                    name="paymentMethod"
                    id="creditCard"
                    value="creditCard"
                    onChange={(e) => handlePaymentMethodChange(e)}

                    
                  />
                  <Form.Check
                    type="radio"
                    label="PayPal"
                    name="paymentMethod"
                    id="paypal"
                    value="paypal"
                    onChange={(e) => handlePaymentMethodChange(e)}
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
