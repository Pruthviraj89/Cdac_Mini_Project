import express from 'express';
import { addFeedback, getFeedback } from '../controllers/Feedback.js';



const feebackRoutes=express.Router();

feebackRoutes.get("/",getFeedback);
feebackRoutes.post("/",addFeedback);

export default feebackRoutes;