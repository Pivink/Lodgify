require("dotenv").config(); // Load environment variables from .env file
const Razorpay = require("razorpay");

// Debug: Print keys before initializing Razorpay
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "LOADED" : "MISSING");
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "LOADED" : "MISSING");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = razorpay;
