import React from 'react'
import Header from '../components/Header'
import { Container } from 'react-bootstrap'
import Registration from '../features/register/registration'

function RegisterScreen() {


  
  return (
    <div>  <Header/>
      <main className="py-3">
        <Container>

       <Registration/>
        </Container>
        </main>
</div>
  )
}

export default RegisterScreen