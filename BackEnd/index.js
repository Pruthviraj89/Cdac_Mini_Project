import express from 'express';
import { createDbConnection } from './src/DbConfig/dbconfig.js';
import cors from 'cors';
import YogaRouter from './src/routes/YogaRoutes.js';
import CourseRouter from './src/routes/CourseRoutes.js';


var app=express();
var conn=createDbConnection();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome To Blog");
})

 app.use("/yoga/user",YogaRouter);

 app.use("/yoga/course",CourseRouter);



app.listen(8700,()=>{
    console.log("Listening to port 8700");
})