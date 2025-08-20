import React, { useState } from 'react'
import { Container,Form,Button,Row,Col } from 'react-bootstrap'
import {useAuthentication} from '../../hooks/useUserAuthentication'
import useAuthStore from '../../store/authStore'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import Header from '../../components/Header'
export default function SignIn() {

  const {register, handleSubmit, formState: { errors }} = useForm()

 const {isAuthenticated} = useAuthStore()
  const {login,isLoading} = useAuthentication()


if(isAuthenticated) {
  return <Navigate to="/" replace />;
}

  function handleSubmitLogin (data,e) {
    e.preventDefault()


    const {email,password} = data

    login({email,password})

  }

  return(
    <>
        <Header/>
      <main className="py-3">

      
  <Container className="d-flex align-items-center justify-content-center"  style={{ height: '50vh' }} >

      <Form className="w-50" onSubmit={ handleSubmit(handleSubmitLogin)} style={{ maxWidth: '400px' }}>

        <h2 style={{ color:'#6f7274'}}>Sign In</h2>
        <Form.Group controlId="formBasicEmail">
     
          <Form.Label>Email Address</Form.Label>
          <Form.Control {...register('email')} type='email'  className="form-control" placeholder="Email address" required="" autoFocus=""/>
 
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register('password')} type="password" className="form-control" placeholder="Password" required=""/>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign in
        </Button>
        <Row className="py-3">
          <Col>
            New Customer? <a href="/register">Register</a>
          </Col>  
          </Row>

      </Form>
      </Container>
</main>
</>
)
  


}