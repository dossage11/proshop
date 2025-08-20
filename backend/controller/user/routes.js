import express from 'express';
const router = express.Router();
import { authMiddleware } from '../../middleware/authMiddleware.js'; // Import the authentication middleware

import { getUserById,updateUserProfile,getUsers,authUser,getUserProfile, registerUser, deleteUser } from '../../controller/user/index.js'; // Import the service to get users

router.get('/users/:id',authMiddleware, getUserById); // Define the route to get a single user by ID
router.delete('/user/:id',authMiddleware,deleteUser)
router.get('/users',authMiddleware, getUsers); // Define the route to get all users
router.post('/auth/login', authUser); // Define the route for user authentication
router.post('/auth/registration',registerUser)
router.get('/user/profile', authMiddleware, getUserProfile);

router.patch('/user/update/:id',authMiddleware, updateUserProfile); // Define the route to update user profile
export { router }; // Export the router