import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

function CheckoutSteps({step1, step2, step3, step4}) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ?  (<Nav.Link >
          <NavLink to="/login" active={step1}>Sign In</NavLink>
        </Nav.Link>):   (<Nav.Link disabled>Sign In</Nav.Link>)}

      </Nav.Item>

      <Nav.Item>
        {step2 ?  (<Nav.Link>
          <NavLink  to="/shipping" active={step2}>Shipping</NavLink>
        </Nav.Link>) : (<Nav.Link disabled>Shipping</Nav.Link>)}
      </Nav.Item>
      <Nav.Item>
        {step3 ?  (<Nav.Link >
          <NavLink to="/payment" active={step3}>Payment</NavLink>
        </Nav.Link>) : (<Nav.Link disabled>Payment</Nav.Link>)}
      </Nav.Item>
      <Nav.Item>
        {step4 ?  (<Nav.Link>
          <NavLink to="/placeorder" active={step4}>Place Order</NavLink>
        </Nav.Link>) : (<Nav.Link disabled>Place Order</Nav.Link>)}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps