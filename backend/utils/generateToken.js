import jwt from 'jsonwebtoken';


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export default generateToken;
// This function generates a JWT token using the user's ID and a secret key from environment variables.