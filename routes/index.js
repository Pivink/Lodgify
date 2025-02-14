const express = require("express");
const mongoose = require("mongoose");
const listining = require("../models/listing");
const router = express.Router();
router.get("/index", async (req, res) => {
    try {
        const List = await listining.find();
        console.log("Data Fetched!");
        res.render("index",{idx:List});
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;