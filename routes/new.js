const express = require("express");
const mongoose = require("mongoose");
const listing=require("../models/listing.js");
const routes=express.Router();
routes.get("/index/create",(req,res)=>{
    res.render("create");
});
 

module.exports=routes;