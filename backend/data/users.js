import bcrypt from "bcryptjs"


const user = [{
    name: 'John Doe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10), // Hashing the password
    isAdmin: true
},
{
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10), // Hashing the password
    isAdmin: false
},{
    name: 'Jim Doe',
    email: 'jim@example.com',
    password: bcrypt.hashSync('123456', 10), // Hashing the password
    isAdmin: false
}
]


export default user;