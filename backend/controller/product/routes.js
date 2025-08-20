import express from 'express';
const router = express.Router();


import {getProducts, getProductById, deleteProductById} from  '../../controller/product/index.js'; // Import the service to get products
import { authMiddleware } from '../../middleware/authMiddleware.js';

// import  {} from '../services/products'; // Import the service to get a single product

router.get('/products',authMiddleware, getProducts); // Define the route to get products
router.get('/products/:id',authMiddleware, getProductById); // Define the route to get a single product by ID
router.delete('/product/:id',authMiddleware, deleteProductById)

 export   {router} ; // Export the router