import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type:String,
    required:[true,"User Email is required"],
    unique:true,
    trim:true,
    lowercase:true,
   match:[/\S+@\S+\.\S+/,"Please enter a valid email"]
  },
  password:{
    type:String,
    required:[true,"User Password is required"],
    minLength:6,
  }
  //time stamps for for saving the time of creation and update
},{timestamps:true});


const User=mongoose.model('User',userSchema);

export default User;