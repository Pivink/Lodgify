const express = require("express");
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");
const router = express.Router();
const { saveRedirectUrl } = require("../middleware/middleware.js");
router.get("/profile/:id",saveRedirectUrl,async(req,res,next)=>{
    try{
        console.log("Profile Route!");
        // console.log(req.user);
        let {id}=req.params;
        console.log(id);
        const user= await User.findById(id);
        const listings=await Listing.find({owner:id});
        console.log(user);
        // console.log(listings);
        res.render("profile",{user,listings,bookings:[]});
    }catch(err){
        next(err);
    }
})

module.exports=router;