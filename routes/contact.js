const express = require("express");
const router = express.Router();

router.get("/about",(req,res,next)=>{
    try{
        res.render("about");
    }catch(err){
        console.log(err);
        next(err);
    }
});

router.get("/contactUs",(req,res)=>{
    res.render("contact");
})
module.exports=router;