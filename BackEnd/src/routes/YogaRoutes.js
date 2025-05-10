import express from 'express';
import { addUsers, deleteUsers, getUserById, getUsers, putUsers } from '../controllers/Users.js';
import { getCourse } from '../controllers/Course.js';


const   YogaRouter=express.Router();//to avoid cyclic dependancy we are using this instead of express()


//posting blog for 1st time
YogaRouter.post("/",addUsers);
YogaRouter.get("/",getUsers);
YogaRouter.get("/:id",getUserById);
//update
YogaRouter.put("/:id",putUsers);
YogaRouter.delete("/:id",deleteUsers);






export default YogaRouter;
