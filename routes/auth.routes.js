import { Router } from "express";

const authrouter = Router();

authrouter.post("/sign-up", (req, res) => {
    res.send({title:"Signup Up"});
});

authrouter.post("sign-in",(req,res)=>{
    res.send({title:"Sign In"});
})

authrouter.post("/sign-out",(req,res)=>{
    res.send({title:"Sign Out"});
});


export default authrouter;