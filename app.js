import express from 'express';
import { PORT } from './config/env.js';

const app = express();

//method to get the request 
app.get('/',(req,res)=>{
    res.send('Welcome to Subscription')
})
//method to listen to server
app.listen(PORT,()=>{
console.log(`Subscription Tracker API is running on the http://localhost:${PORT});`);
})

export default app;