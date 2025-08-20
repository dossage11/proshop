import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Countries, countryCodeToName } from '../../utils/enum'
import { zodResolver } from '@hookform/resolvers/zod'
function ShippingDetails() {


    const shippingSchema = z.object({
        address:z.string().min(1,{message:"Required"}),
        city:z.string().min(1,{message:"Required"}),
        postalCode:z.string().min(1,{message:"Required"}).regex(/^\d+$/, {message: "Must contain only numbers"}),
        country:z.string().transform((code) => countryCodeToName[code])
        .pipe(z.enum(Countries))
    })

const {register,handleSubmit,formState:{errors}}= useForm({resolver:zodResolver(shippingSchema)})

 
function handleShippingInformation (data){

 console.log(data);
 
}


  return (
   <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <CardHeader>
              <h4 className="mb-0">Shipping Information</h4>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(handleShippingInformation)}> 
                <FormGroup controlId="formAddress">
                  <FormLabel>Address</FormLabel>
                  <FormControl
                    type="text"
                    name="address"
                   {...register('address')}
                    placeholder="Enter your street address"
                    
                  />
                    {errors.address && (
                <Form.Text className="text-danger">
                    {errors.address.message}
                </Form.Text>)}
                </FormGroup>

                <FormGroup controlId="formCity">
                  <FormLabel>City</FormLabel>
                  <FormControl
                    type="text"
                    name="city"
                   {...register('city')}
                   
                    placeholder="Enter your city"
                    
                  />

                   {errors.city && (
                <Form.Text className="text-danger">
                    {errors.city.message}
                </Form.Text>)}
                </FormGroup>

                <FormGroup controlId="formPostalCode">
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl
                    type="text"
                    name="postalCode"
                     {...register('postalCode')}
                   
                    placeholder="Enter postal code"
                   
                  />
                     {errors.postalCode && (
                <Form.Text className="text-danger">
                    {errors.postalCode.message}
                </Form.Text>)}
                </FormGroup>

                <FormGroup controlId="formCountry">
                  <FormLabel>Country</FormLabel>
                  <Form.Select 
                    as="select"
                    name="country"
                    {...register('country')}
                   
                    
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="PH">Philippines</option>
                    <option value="SG">Singapore</option>
                    <option value="IN">India</option>
                    <option value="BR">Brazil</option>
                    <option value="MX">Mexico</option>
                  </Form.Select>

                     {errors.country && (
                <Form.Text className="text-danger">
                    {errors.country.message}
                </Form.Text>)}
                </FormGroup>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type='submit'
                    className="mt-3"
                  >
                    Submit Shipping Information
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingDetails