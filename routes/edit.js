const express = require("express");
const mongoose = require("mongoose");
const listining = require("../models/listing");
const router = express.Router();
router.get("/edit/:id", async (req, res) => {
    console.log("Edit Route");
    const { id } = req.params;
    console.log(id);
    const l = await listining.findById(id);
    console.log(l);
    res.render("edit.ejs", { idx: l });
})

router.put("/:id/edit", async (req, res) => {
    console.log("Edit Put Route");
    let { id } = req.params;
    // const { title, description, image, price, location, country } = req.body;

    console.log(req.body)
    await listining.findByIdAndUpdate(id,{...req.body});
    res.redirect("/index");
})
module.exports = router;