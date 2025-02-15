const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const mongoose = require("mongoose");
const {saveRedirectUrl} = require("../middleware/middleware.js");


router.delete("/index/:id", saveRedirectUrl,async (req, res, next) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error("Invalid ID format");
        error.status = 400;
        return next(error);
    }
    try {
        await Listing.deleteOne({_id:id});
        req.flash("success","Listing Deleted!");
        let redirectPath =`/profile/${req.user._id}` || "/";
        res.redirect(redirectPath);
    } catch (err) {
        console.log(err);
        const error = new Error("Cannot Delete Listing!");
        error.status = 500;
        return next(error);
    }
});


module.exports = router;
