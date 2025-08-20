import jwt from 'jsonwebtoken';
import User from '../../schema/user.js';
import { NotFoundError } from '../../utils/error.js';
import generateToken from '../../utils/generateToken.js';
import {z} from 'zod'
//@description: Get all users   
//@route: GET /api/users
export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@description: Get user by ID  

//@route: GET /api/users/:id

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const authUser = async(req,res)=>{


   const {email, password}= req.body
 const loginSchema = z.object({
    email:z.string().min(1,{message:'The enter you email'}),
    password:z.string().min(1,{message:'The enter you password'})

 })

 const data = loginSchema.parse({email, password})

    
   const user = await User.findOne({email})



    if(user && (await user.matchPassword(password))){
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }

}



export const getUserProfile = async(req,res)=>{

    const user = await User.findById(req.user._id)

  
    if(user){
     res.status(201).json({
         _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
     })
    }else
    req.status(404)
    throw new Error('User not found')


  
} 



export const registerUser = async(req,res)=>{
    const {name,email,password,isAdmin} = req.body
    
      const registerSchema = z.object({
                name:z.string().max(255),
                email:z.string().email().toLowerCase(),
                password:z.string().min(10).max(255),
                isAdmin:z.boolean().default(false)

      })




    const userExists = await User.findOne({email})

      
    if(userExists){
        res.status(400)
        // return res.status(400).json({ message: 'Email address is already in use' })
        throw new Error('Email address is already in use')
    }

    const data = registerSchema.parse({name,email,password,isAdmin})
  
     const newUser = await User.create(data)


    if(newUser){

   const token = generateToken(newUser._id);

        
        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            token:token
          
   })
    }else{
        res.status(400)
        throw new Error("Invalid input")
    }
   

}

export const deleteUser = async(req,res) => {
  const user = await User.deleteOne({_id:String(req.params.id)}); 

     
    if(user.deletedCount===0){
      throw new NotFoundError("User not found")
    }


     res.status(201).json({
        user,
        message:"Successfully deleted"
    })
}

export const updateUserProfile = async(req,res) => {

    
    const {name, email, password,isAdmin} = req.body;


     const updateSchema = z.object({
                name:z.string().min(1,{message:'Name is required'}).max(255),
                email:z.string().min(1,{message:'Email is required'}).email().toLowerCase(),
                password:z.string().min(10).max(255),
                isAdmin:z.boolean().optional()
      })
      const data = updateSchema.parse({name,email,password,isAdmin})
      
 
      const user = await User.findById(req.params.id); 
      
      
            
    if(!user){
        throw new NotFoundError("User not exist")
    }

  

    user.name = data.name || user.name;
    user.email = data.email || user.email;
    user.password = data.password || user.password;
    user.isAdmin = data.isAdmin || user.isAdmin;    
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
}
