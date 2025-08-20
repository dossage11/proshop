
import { Tab, Tabs } from 'react-bootstrap';
import UserDetails from '../features/user/UserDetails';
import { useState } from 'react';
import UserList from '../features/user/UserList';
function ProfileScreen() {

  const [key, setKey] = useState('profile');
   
  return (

     <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
    
      <Tab eventKey="profile" title="Profile">
        <UserDetails/>
      </Tab>

        <Tab eventKey="users" title="Users">
      <UserList/>
      </Tab>
        <Tab eventKey="orders" title="My Orders">
        My Orders
      </Tab>
     
    </Tabs>

    
  )
}

export default ProfileScreen