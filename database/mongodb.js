import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error('Please define the MONGODB_URI enviorment variable inside .env.<development/production>.local')
}

const connectToDatabase=async()=>{
    console.log(`Connecting to MongoDB: ${DB_URI}`);
    try{
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,  // 30 seconds
            serverSelectionTimeoutMS: 30000,
        });
        console.log(`MongoDB connected: ${NODE_ENV}`);

    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDatabase;