import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./schema/user.js";
import Product from "./schema/products.js";
import Order from "./schema/order.js";
import users from "./data/users.js";
import products from "./data/products.js";  
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {

    try {
        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
    
        // Import new data
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
    
        const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser };
        });
    
        await Product.insertMany(sampleProducts);
        await User.insertMany(users);
    
        console.log("Data Imported Successfully");
        process.exit();
    } catch (error) {
        console.error("Error with data import:", error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
    
        console.log("Data Destroyed Successfully");
        process.exit();
    } catch (error) {
        console.error("Error with data destruction:", error);
        process.exit(1);
    }
}


if (process.argv[2] === "-d") {
    destroyData();
}   else {
    importData();
}