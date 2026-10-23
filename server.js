const express=require('express');
const app=express();
const cors=require('cors');
const env=require('dotenv');

env.config();


const transactionRoutes=require('./routes/transaction.routes');
const authRoutes=require('./routes/auth.routes');
const goalRoutes=require('./routes/goal.routes');
const dashboardRoutes=require('./routes/dashboard.routes');
const reportsRouters = require('./routes/reports.routes');
const ConnectDB=require('./config/db');


ConnectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/transaction",transactionRoutes);
app.use("/api/auth",authRoutes);
app.use('/api/goal',goalRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.use('/api/reports',reportsRouters);




app.get('/',(req,res)=>{
    res.send('Hello World');
})



app.listen(3000,()=>{
    console.log('Server is running at port 3000')
});