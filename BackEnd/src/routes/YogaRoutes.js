import express from 'express';
import { addUsers, deleteUsers, getUserById, getUsers, loginUser, putUsers } from '../controllers/Users.js';
import { getCourse } from '../controllers/Course.js';


const   YogaRouter=express.Router();


//posting blog for 1st time
YogaRouter.post("/",addUsers);
YogaRouter.post("/login",loginUser)
YogaRouter.get("/",getUsers);
YogaRouter.get("/:id",getUserById);
//update
YogaRouter.put("/:id",putUsers);
YogaRouter.delete("/:id",deleteUsers);






export default YogaRouter;
