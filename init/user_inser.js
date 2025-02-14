const mongoose = require("mongoose");
const Review = require("../models/review");
const User = require("../models/user");
const Listing = require("../models/listing");
const fetch = require("node-fetch"); // Ensure this is installed: npm install node-fetch

// Ensure environment variables are loaded
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const dbUrl = process.env.MONGO_DB_URL;

const main = async () => {
    try {
        if (!dbUrl) throw new Error("MONGO_DB_URL is not defined!");
        
        await mongoose.connect(dbUrl);
        console.log("Database Connected!");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
};

const add_admin = async () => {
    try {
        const Admin = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: "Admin@123",
            isAdmin: true,
        });
        await Admin.save();
        console.log("Admin created successfully!");
    } catch (err) {
        console.error("Error while adding admin:", err);
    }
};

const add_reviews = async () => {
    try {
        const user_id = "6797b170ef51b53449096240";
        const listing_id = "67a4e1059be7aed18e048754";

        await Review.deleteMany({}); // Wait for deletion to complete
        const reviews = [
            { rating: 5, comment: "Amazing place, highly recommend!", from: user_id, listing: listing_id, createdAt: new Date() },
            { rating: 4, comment: "Very comfortable and clean.", from: user_id, listing: listing_id, createdAt: new Date() },
            { rating: 3, comment: "Good place but a bit noisy.", from: user_id, listing: listing_id, createdAt: new Date() },
            { rating: 4, comment: "Lovely ambiance and great service!", from: user_id, listing: listing_id, createdAt: new Date() },
            { rating: 2, comment: "Not as expected, needs improvement.", from: user_id, listing: listing_id, createdAt: new Date() },
        ];

        const result = await Review.insertMany(reviews);
        console.log("Reviews added successfully:", result);
    } catch (err) {
        console.error("Error while adding reviews:", err);
    }
};

const find_listing = async () => {
    try {
        const listings = await User.find({_id:"67a76172565628561622a2de"});
        console.log("Listings:", listings);
    } catch (err) {
        console.error("Error while fetching listings:", err);
    }
};

const get_facts = async () => {
    try {
        const response = await fetch("http://localhost:3000/test/67a766fec1f6aac08068163d");
        const data = await response.json();
        console.log("Facts:", data);
    } catch (err) {
        console.error("Error while fetching facts:", err);
    }
};

// Connect to the database and then run your desired functions
(async () => {
    // await main();
    // Uncomment the functions below to execute them one at a time
    // await add_admin();
    // await add_reviews();
    // await find_listing();
    await get_facts();
})();
