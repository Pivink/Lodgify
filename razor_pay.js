const Razorpay = require("razorpay");

// Debug: Print keys before initializing Razorpay
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID || "MISSING_KEY");
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET || "MISSING_SECRET");

const razorpay = new Razorpay({
  key_id: "rzp_test_eThLGW3Me5FJvr",
  key_secret: "BRKMFSlLiA1JfAc1IUvo0C2e"
});

module.exports = razorpay;
