import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        
       mongoose.connect(`${process.env.DBCONFIG}/${process.env.DBNAME}`)
          .then(() => console.log('Connected in proshop_mongoDB!'));
        
    } catch (error) {
        
    }
}


export default connectDB