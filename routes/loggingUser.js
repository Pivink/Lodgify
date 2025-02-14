const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");
const router = express.Router();
// const passport=require("passport");
const { saveRedirectUrl } = require("../middleware/middleware.js");


router.get("/signIn", saveRedirectUrl, (req, res) => {
    res.render("sign_in_up");
})



router.post("/signUp", async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            req.flash("error", "User with this email or username already exists!");
            return res.redirect("/signIn");
        }

        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);  // This hashes the password

        req.logIn(registeredUser, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            req.flash("success", "Account created successfully!");
            res.redirect("/index");  // Redirect to home after signup
        });
    } catch (err) {
        console.log(err);
        req.flash("error", err.message);
        res.redirect("/signUp");
    }
});


router.post("/login", saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/signIn",
    failureFlash: true
}), async (req, res, next) => {
    try {
        console.log("Login route");
        req.flash("success", "Welcome to the app");
        console.log("Req session in log in: ", req.session);

        if (req.session.pendingReview) {

            console.log("Req review in log in: ", req.session.pendingReview);

            req.body = req.session.pendingReview;
            req.session.pendingReview = null;
        }
        console.log(res.locals.redirectUrl);
        let redirectPath = res.locals.redirectUrl || "/index";
        res.redirect(redirectPath);
    } catch (err) {
        console.log(err);
        let error = new Error("Something went wrong with the database!");
        error.status = 500;
        req.flash("error", "Cannot log in!");
        return next(error);
    }
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/index");
    });
});



module.exports = router;