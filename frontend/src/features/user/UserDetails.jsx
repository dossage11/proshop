
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import useAuthStore from "../../store/authStore"
 import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateProfile } from '../../hooks/useUsers'

const UserDetails=()=> {
  const {user} = useAuthStore()

   const UpdateSchema = z.object({
      name: z.string().min(1,{message:'Required'}).max(100),
      email: z.string().min(1,{message:'Required'}).email('Invalid email address').toLowerCase(),
      password: z.union([z.string().min(8,{message:'Password must be at least 8 characters long'}).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),z.undefined()]),
      passwordConfirm: z.union([z.string().min(8,{message:'Too small: expected at least 8 characters long'}).max(100),z.undefined()]),
      isAdmin:z.boolean().default(false)
    }).refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ['passwordConfirm'],
      mode: 'onSubmit',
      
    })

    const {register, handleSubmit,reset, formState: { errors }} = useForm({resolver: zodResolver(UpdateSchema),defaultValues:user})

    const {updateUser,isUpdating} = useUpdateProfile()

    function handleUpdate (data) {
   
      const {passwordConfirm,...userData} = data

      const userInfo = {...userData,id:user._id}
      
      updateUser(userInfo,{
        onSuccess:()=>{
            reset({
              password:"",
              passwordConfirm:""
            })
        }

      })
      
    
   }

   
  return (
    <div>  
     
        <Container className="d-flex align-items-center justify-content-center"  style={{ height: '50vh' }} >

      <Form className="w-50" onSubmit={ handleSubmit(handleUpdate)} style={{ maxWidth: '400px' }}>

        <h2 style={{ color:'#6f7274'}}>User Profile</h2>

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
          <Form.Control {...register('email')} type='email' disabled  className="form-control" placeholder="Email address" autoFocus=""/>
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
          Update
        </Button>
        </Col>
 </Row>
      
     

      </Form>
      </Container>
</div>
  )
}

export default UserDetails