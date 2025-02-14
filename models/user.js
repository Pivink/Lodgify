const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Email is unique
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Add Passport-Local-Mongoose plugin for username/password authentication
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", userSchema);
