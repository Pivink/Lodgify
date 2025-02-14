const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const Booking = require("../models/booking.js");
const { saveRedirectUrl } = require("../middleware/middleware.js");
const { createOrder, verifyPayment } = require("../razor_pay.js");  

router.get("/booking/:id", saveRedirectUrl, async (req, res, next) => {
    try {
        console.log("Booking Route");
        let { id } = req.params;
        let listing = await Listing.findById(id);
        console.log(listing)
        
        // Pass the Razorpay key to EJS
        res.render("booking", { idx: listing, key: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
        console.log(err);
        req.flash("error", "Failed To booking");
        next(err);
    }
});
router.get("/bookings/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Fetching bookings for user:", userId);

        // Find all bookings for the given user ID
        const bookings = await Booking.find({ userId });

        // Render the urbooking.ejs page with the bookings data
        res.render("urbookings", { bookings });
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).send("An error occurred while fetching bookings.");
    }
});
router.delete("/bookings/cancel/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;
        await Booking.findByIdAndDelete(bookingId);
        res.status(200).json({ success: true, message: "Booking canceled successfully" });
    } catch (err) {
        console.error("Error canceling booking:", err);
        res.status(500).json({ success: false, message: "Failed to cancel booking" });
    }
});


module.exports = router;
