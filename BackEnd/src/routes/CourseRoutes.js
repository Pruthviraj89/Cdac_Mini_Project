import express from 'express';
import { addCourse, deleteCourse, getCourse, getCourseById, getCourseBytitle, putCourse } from '../controllers/Course.js';


const   CourseRouter=express.Router();//to avoid cyclic dependancy we are using this instead of express()


//posting blog for 1st time
CourseRouter.post("/",addCourse);
CourseRouter.get("/",getCourse);
CourseRouter.get("/:id",getCourseById);
CourseRouter.get("/title/:title",getCourseBytitle)
//update
CourseRouter.put("/:course_id",putCourse);
CourseRouter.delete("/:course_id",deleteCourse);






export default CourseRouter;
