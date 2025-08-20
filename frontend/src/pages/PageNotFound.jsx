import React from 'react'
import Alert from 'react-bootstrap/Alert';

export default function PageNotFound() {
  return (
   <div style={{ textAlign: 'center', marginTop: '5vh' }}>
     <Alert variant="danger" >
           <Alert.Heading> "Oops! Page Not Found"</Alert.Heading>
              <p>
                 The page you are looking for does not exist. Please check the URL or return to the home page.
                </p>
       </Alert>
   </div>
  )
}
