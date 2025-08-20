import React from 'react'
import   Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Spinner animation="border" variant="primary" />  
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Loader