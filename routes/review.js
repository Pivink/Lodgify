const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const mongoose = require("mongoose");
const Review = require("../models/review");

const {saveRedirectUrl} = require("../middleware/middleware.js");


router.post("/review/:id", saveRedirectUrl,async (req, res) => {  // ✅ Added '/'
    try {
        console.log("Review Route..");
        const {id}=req.params;
        console.log(req.user);
        const {rating,comment}=req.body;
        let parseRating=parseFloat(rating);
        const review =await new Review({rating:parseRating,
            comment,from:req.user.id,listing:id}).save();
        console.log(review);
        req.flash("success","Review Added");
        let redirectPath =`/index/${id}`;
        res.redirect(redirectPath);
    } catch (err) {
        console.log(err);
        req.flash("error", "Review not added!");
        let redirectPath = `/index/${req.params.id}` || "/";
        res.redirect(redirectPath);
    }
});

module.exports = router;
