import express from 'express';
import { createDbConnection } from './src/DbConfig/dbconfig.js';
import cors from 'cors';
import YogaRouter from './src/routes/YogaRoutes.js';
import CourseRouter from './src/routes/CourseRoutes.js';
import adminsRouter from './src/routes/AdminRoutes.js';

import bookingsRouter from './src/routes/bookingsRoutes.js';

var app=express();
var conn=createDbConnection();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome To Blog");
})

 app.use("/yoga/user",YogaRouter);

 app.use("/yoga/course",CourseRouter);

 app.use("/yoga/admin",adminsRouter);
 app.use("/yoga/bookings", bookingsRouter);



app.listen(8700,()=>{
    console.log("Listening to port 8700");
})