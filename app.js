import express from 'express';


const app = express();

//method to get the request 
app.get('/',(req,res)=>{
    res.send('Welcome to Subscription')
})
//method to listen to server
app.listen(3000,()=>{
console.log('Subscription Tracker API is running on the http://localhost:3000');
})

export default app;