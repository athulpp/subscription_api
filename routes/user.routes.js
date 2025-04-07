import { Router } from "express";
import { getUser, getUsers } from "../controller/user.controller.js";
import  authorize  from "../middlewares/auth.middleware.js";
const userRouter=Router();

userRouter.get("/",getUsers);

// userRouter.get(("/"),(req,res)=>{
//     res.send({title:'GET all users'});
// })

userRouter.get("/:id",authorize,getUser);

userRouter.post(("/"),(req,res)=>{
    res.send({title:'CREATE new user'});
})

userRouter.put(("/:id"),(req,res)=>{
    res.send({title:'UPDATE user'});
})

userRouter.delete(("/:id"),(req,res)=>{
    res.send({title:'Delete user'});
})


export default userRouter;