import { StatusCodes } from "http-status-codes";
import { getConnectionObject } from "../config/DbConfig.js";

const conn = getConnectionObject();

// Create Booking
export function createBooking(req, res) {
    const data = req.body;
    const qry = `INSERT INTO bookings (user_id, course_id, booking_date, status, payment_status, session_start_date) 
                 VALUES (${data.user_id}, ${data.course_id}, ${data.booking_date}, '${data.status}', '${data.payment_status}', ${data.session_start_date})`;

    conn.query(qry, (err, result) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Insertion failed" });
        } else {
            res.status(StatusCodes.OK).send({ message: "Booking created", id: result.insertId });
        }
    });
}

// Get All Bookings
export function getAllBookings(req, res) {
    const qry=`SELECT * FROM bookings`;
    conn.query(qry, (err, result) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Fetching failed" });
        } else {
            res.status(StatusCodes.OK).send(result);
        }
    });
}

// Get Booking by ID
export function getBookingById(req, res) {
    const id = parseInt(req.params.id);
    const qry= `SELECT * FROM bookings WHERE booking_id = ${id}`;
    conn.query(qry , (err, result) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Error fetching booking" });
        } else if (result.length === 0) {
            res.status(StatusCodes.NOT_FOUND).send({ message: "Booking not found" });
        } else {
            res.status(StatusCodes.OK).send(result[0]);
        }
    });
}

// Update Booking
export function updateBooking(req, res) {
    const id = parseInt(req.params.id);
    const data = req.body;
    const qry = `UPDATE bookings SET 
        user_id = ${data.user_id}, course_id = ${data.course_id}, booking_date = ${data.booking_date}, status = '${data.status}', 
        payment_status = '${data.payment_status}', session_start_date = ${data.session_start_date} 
        WHERE booking_id = ${id}`;

    conn.query(qry, (err) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Update failed" });
        } else {
            res.status(StatusCodes.OK).send({ message: "Booking updated" });
        }
    });
}

// Delete Booking
export function deleteBooking(req, res) {
    const id = parseInt(req.params.id);
    const qry= `DELETE FROM bookings WHERE booking_id = ${id}`;
    conn.query(qry, (err) => {
        if (err) {
            console.log(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Deletion failed" });
        } else {
            res.status(StatusCodes.OK).send({ message: "Booking deleted" });
        }
    });
}
