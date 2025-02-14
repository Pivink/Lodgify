const express = require("express");
const mongoose = require("mongoose");
const listining = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");

const router = express.Router();
router.get("/index/:id", async(req,res)=>{
    try{
        console.log("Show Route");
         let {id}=req.params;
        const l=await listining.findById(id);
        if(!l){
            req.flash("error","Listing not available!");
            return res.redirect("/index");
        }
        const Listing=await listining.findById(id).populate('owner');
        console.log(Listing);
        const reviews=await Review.find({listing:id}).populate('from');
        // console.log(reviews)
        res.render("show",{idx:l,reviews:reviews,user_name:Listing.owner.username});
    }catch(err){
        console.log(err);
    }
});
module.exports=router;