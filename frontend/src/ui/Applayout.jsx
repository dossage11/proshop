import React from 'react'
import Header from '../components/Header'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function Applayout() {
  return (
    <div> 
        <Header/>
      <main className="py-3">
        <Container>
            <Outlet/>
        </Container>
       </main>

      <Footer/>
      </div>
  )
}

export default Applayout