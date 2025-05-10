import express from 'express';
import { adminLogin, registerAdmin } from '../Controllers/AdminController.js';

const adminsRouter= express.Router();


adminsRouter.post("/",express.json(),registerAdmin);


adminsRouter.post("/login",express.json(),adminLogin);

export default adminsRouter;