import { Router } from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller.js";

const authrouter = Router();

authrouter.post("/sign-up", signUp);
authrouter.post("/sign-in", signIn);
authrouter.post("/sign-out", signOut);

export default authrouter;
