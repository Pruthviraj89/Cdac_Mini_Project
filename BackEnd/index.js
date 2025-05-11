import express from 'express';
import { createDbConnection } from './src/DbConfig/dbconfig.js';
import cors from 'cors';
import YogaRouter from './src/routes/YogaRoutes.js';
import CourseRouter from './src/routes/CourseRoutes.js';
<<<<<<< HEAD
import bookingsRouter from './src/routes/bookingsRoutes.js';
=======
import adminsRouter from './src/routes/AdminRoutes.js';

>>>>>>> 66e5ed83e8c4f9311f74811654770a1aec7a208c

var app=express();
var conn=createDbConnection();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome To Blog");
})

 app.use("/yoga/user",YogaRouter);

 app.use("/yoga/course",CourseRouter);

<<<<<<< HEAD
 app.use("/bookings", bookingsRouter);
=======
 app.use("/yoga/admin",adminsRouter);
>>>>>>> 66e5ed83e8c4f9311f74811654770a1aec7a208c



app.listen(8700,()=>{
    console.log("Listening to port 8700");
})