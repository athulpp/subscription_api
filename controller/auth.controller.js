import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { JWT_SECRET,JWT_EXPIRES_IN } from "../config/env.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
     

        // Create the new user
        //in this session passing if something goes wrong it will not save 
        const newUsers = await User.create([{ name, email, password: hashedPassword }],{session});
        // await newUser.save({ session });
        const token=jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ success:true,message:"User created successfully",data:{token,user:newUsers[0]} });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    // Implement Sign In logic here
};

export const signOut = async (req, res, next) => {
    // Implement Sign Out logic here
};