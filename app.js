import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authrouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';
const app = express();

//handle json data and send in requests or Api Calls (built method in express)
 app.use(express.json());

 //handle helps us to process the form data sent via HTML(built method in express)
 app.use(express.urlencoded({extended:false}));

 //reads cookie from the incoming request and parses it into a JavaScript object
 app.use(cookieParser());
 app.use(arcjetMiddleware);

app.use('/api/v1/auth',authrouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflows',workflowRouter);

app.use(errorMiddleware);
//method to get the request 
app.get('/',(req,res)=>{
    res.send('Welcome to Subscription')
})
// console.log(PORT,'4444')
//method to listen to server
app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);
   await connectToDatabase();
console.log(`Subscription Tracker API is running on the http://localhost:${PORT});`);
})

export default app;