import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authrouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
const app = express();



app.use('/api/v1/auth',authrouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

//method to get the request 
app.get('/',(req,res)=>{
    res.send('Welcome to Subscription')
})
//method to listen to server
app.listen(PORT,async()=>{
   await connectToDatabase();
console.log(`Subscription Tracker API is running on the http://localhost:${PORT});`);
})

export default app;