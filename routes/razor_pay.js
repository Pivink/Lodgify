const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/booking.js");

const router = express.Router();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
router.post("/createOrder", async (req, res) => {
    try {
        const { amount } = req.body;
        const order = await instance.orders.create({
            amount: amount,
            currency: "INR",
        });
        res.json(order);
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ error: "Failed to create Razorpay order" });
    }
});

// Verify Payment and Save Booking
router.post("/payment/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature === razorpay_signature) {
            // Payment verified, save booking data
            const newBooking = new Booking({
                userId: bookingData.userId,
                listingId: bookingData.listingId,
                price: bookingData.price,
                pricePerNight: bookingData.pricePerNight,
                name: bookingData.fullName,
                countryCode: bookingData.countryCode,
                phone: bookingData.phone,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut
            });

            await newBooking.save();
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error("Error verifying payment:", err);
        res.status(500).json({ success: false, error: "Payment verification failed" });
    }
});

module.exports = router;
