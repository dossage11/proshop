
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
 import useRegisterStore from '../../store/registerStore'
 import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
 import { useCreateUser } from '../../hooks/useUserAuthentication'
function Registration() {

   const RegisterSchema = z.object({
      name: z.string().min(1,{message:'Required'}).max(100),
      email: z.string().min(1,{message:'Required'}).email('Invalid email address').toLowerCase(),
      password: z.string().min(8,{message:'Password must be at least 8 characters long'}).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
      passwordConfirm: z.string().min(8,{message:'Too small: expected at least 8 characters long'}).max(100),
      isAdmin:z.boolean().default(false)
    }).refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ['passwordConfirm'],
      mode: 'onSubmit',
      
    })

    const {register, handleSubmit, formState: { errors }} = useForm({resolver: zodResolver(RegisterSchema)})

   const createUser = useCreateUser()

    function handleSubmitRegistration (data) {
      const { passwordConfirm, ...userData } = data
      
     createUser.mutate(userData,{
      onSuccess:()=>{
        console.log('User created successfully!')
      }
     })


      
     
       
   }

    function handleFormError (errors) {
      console.log("Form validation errors:", errors);
    }

  return (
    <div>  
     
        <Container className="d-flex align-items-center justify-content-center"  style={{ height: '50vh' }} >

      <Form className="w-50" onSubmit={ handleSubmit(handleSubmitRegistration,handleFormError)} style={{ maxWidth: '400px' }}>

        <h2 style={{ color:'#6f7274'}}>Registration</h2>

     <Form.Group controlId="formBasicName">
     
          <Form.Label>Complete Name</Form.Label>
          <Form.Control {...register('name')}  type='text'  className="form-control" placeholder="Full Name" autoFocus=""/>
          {errors.name && (
          <Form.Text className="text-danger">
            {errors.name.message}
          </Form.Text>
        )}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
     
          <Form.Label>Email Address</Form.Label>
          <Form.Control {...register('email')} type='email'  className="form-control" placeholder="Email address" autoFocus=""/>
   {errors.email && (
          <Form.Text className="text-danger">
            {errors.email.message}
          </Form.Text>
        )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register('password')} type="password" className="form-control" placeholder="Password"/>
            {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control {...register('passwordConfirm')} type="password" className="form-control" placeholder="Confirm Password"/>
          {errors.passwordConfirm && (
          <Form.Text className="text-danger">
            {errors.passwordConfirm.message}
          </Form.Text>
        )}
        </Form.Group>

       <Row className="py-3">
   <Col>
     <Button variant="primary" type="submit">
          Submit
        </Button>
        </Col>
 </Row>
      
     

      </Form>
      </Container>
</div>
  )
}

export default Registration