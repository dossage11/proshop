import jwt from 'jsonwebtoken';
import user from '../schema/user.js';
import { UnauthorizedError } from '../utils/error.js';

export const authMiddleware = async (req, res, next) => {
    let token;     
            // Get token from header
                if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                   
                    
                    try {
  
                    token = req.headers.authorization.split(' ')[1];

                     const decoded = jwt.verify(token, process.env.JWT_SECRET)
           
                     req.user = await user.findById(decoded.id)

                     
                        await next()    
            } 
            catch (error) {

        res.status(401)
            throw new UnauthorizedError('Authorization failed, token not valid');
            }
                  
                 
                     
                }
                 

            

        }
        

    