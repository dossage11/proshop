import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import routes from './controller/routes.js'; // Import all routes from controller/routes.js

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandlerMiddleware, notFoundMiddleware } from './middleware/errorHandlerMiddleware.js';
import { contentTypeMiddleware } from './middleware/contentTypeMiddleware.js';

 
const app = express();
const apiRouter = express.Router();
dotenv.config(); // Load environment variables from .env file

// Enable CORS for all routes
app.use(cors());


app.use(bodyParser.json());
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));


// // Add this middleware to handle missing content-type


app.use('/api/auth/login', contentTypeMiddleware);
app.use('/api/auth/registration', contentTypeMiddleware);
app.use('/api/user/update/:id', contentTypeMiddleware);


// mongoose connection
connectDB();


// routes


//  const routes = [ProdRouter,UserRouter]

routes.forEach(route => {
  apiRouter.use(route);
});


  app.use('/api',apiRouter);

  // middleware
app.use(notFoundMiddleware)
 app.use(errorHandlerMiddleware)





const PORT = process.env.PORT || 3001; // Use environment variable or default to 3001

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`);
});