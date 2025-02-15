const express = require("express");
const Listing = require("../models/listing.js"); 
const routes = express.Router();
const { forListingStorage } = require("../cloudConfig.js");
const multer = require("multer");

const upload = multer({ storage: forListingStorage }); // Ensure correct key

routes.post("/listingProfile", upload.single("image"), async (req, res, next) => {
    try {
        console.log("Create Route!");

        const { title, description, price, location, country } = req.body;
        if (!title) {
            req.flash("error", "Title is Missing");
            return res.redirect("/index/create");
        }
        const newListing = new Listing({
            title,
            description,
            image: {
                filename: req.file.filename, // Cloudinary filename
                url: req.file.path // Cloudinary image URL
            },
            price,
            location,
            country,
            owner: req.user._id,
        });

        await newListing.save();
        // console.log(newListing);
        console.log("current user :---",req.user);
        req.flash("success", "New Listing Created!");
        let redirectPath =`/profile/${req.user._id}` || "/";
        res.redirect(redirectPath);
    } catch (err) {
        console.error("Error creating listing:", err);
        next(new Error("Oops! Failed to create a new listing."));
    }
});

module.exports = routes;
