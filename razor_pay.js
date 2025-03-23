const Razorpay = require("razorpay");

// Debug: Print keys before initializing Razorpay
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID || "MISSING_KEY");
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET || "MISSING_SECRET");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = razorpay;
