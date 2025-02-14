const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listing",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    countryCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10,15}$/, "Please enter a valid phone number"]
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("booking", bookingSchema);