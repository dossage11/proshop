
import { Table } from 'react-bootstrap'
import {useUsers} from '../../hooks/useUsers';
import Loader from '../../components/Loader';


 function UserList() {
  const { data: users, isLoading, error, isError, status } = useUsers()


if (isLoading) return <div><Loader/></div>;

 
if (error) return <div>Error loading users</div>;

  return (
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
 
       

           {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Admin' : 'User'}</td>
            </tr>
          ))}
   

      </tbody>
    </Table>
  )
}

export default UserList