import express from 'express';
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } from '../controllers/Booking.js';

const bookingsRouter = express.Router();

bookingsRouter.post("/", createBooking);
bookingsRouter.get("/", getAllBookings);
bookingsRouter.get("/:title", getAllBookings);
bookingsRouter.get("/:id", getBookingById);
bookingsRouter.put("/:id", updateBooking);
bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;
