
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
    console.log('Development mode');
}
console.log(process.env.CLOUD_NAME);
// Import Modules and Model
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const { checkAuth } = require("./middleware/middleware.js");


const dbUrl = process.env.MONGO_DB_URL;

// =======================
// Import Routes
// =======================
const idx = require("./routes/index.js");
const shw = require("./routes/show.js");
const nw = require("./routes/new.js");
const prf = require("./routes/create.js");
const edt = require("./routes/edit.js");
const dlt = require("./routes/delete.js");
const userRouters = require("./routes/loggingUser.js");
const booking = require("./routes/booking.js");
const profile = require("./routes/profile.js");
const rev = require("./routes/review.js");
const detail = require("./routes/contact.js");
const razorPay=require("./routes/razor_pay.js");

// =======================
// Initialize App
// =======================
const app = express();

// =======================
// Set Up View Engine and Public Directory
// =======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// =======================
// Middleware
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// =======================
// Configure Session Middleware
// =======================
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: "project"
    },
    touchAfter: 24 * 3600
});

app.use(
    session({
        store,
        secret: "project",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

// =======================
// Configure Flash Middleware
// =======================
app.use(flash());

// =======================
// Passport Configuration
// =======================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================
// Global Variables for Flash Messages
// =======================
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    console.log("Current User: ", res.locals.currUser);
    next();
});

// =======================
// Routes
// =======================
 

// Test Listening Route
app.get("/demo", async (req, res) => {
    let fakeUser = User({
        name: "fakeuser",
        email: "fake@gmail.com"
    })
    let fake = await User.register(fakeUser, "fake@123");
    console.log(fake);
    res.send("User Created!");
})
app.get("/testListening", async (req, res) => {
    try {
        const newListening = new listening({
            title: "Sample Title",
            description: "Sample description",
            image: "https://example.com/sample.jpg",
            price: 100,
            location: "Sample Location",
            country: "Sample Country",
        });

        await newListening.save();
        req.flash("success", "New listening created successfully!");
        res.redirect("/index");
        console.log("Data Entered!");
    } catch (err) {
        req.flash("error", "Error creating listening.");
        res.redirect("/index");
    }
});

app.use((req, res, next) => {
    res.locals.user = req.user || null; // Set user to null if not logged in
    next();
});


// Route Definitions
app.get("/", idx);
app.get("/index/create", checkAuth, nw);
app.get("/index/:id", shw);
app.post("/listingProfile", checkAuth, prf);
app.get("/edit/:id", checkAuth, edt);
app.put("/:id/edit", checkAuth, edt);
app.delete("/index/:id", checkAuth, dlt);
app.get("/signIn", userRouters);
app.post("/signUp", userRouters);
app.post("/login", userRouters);
app.get("/logout", userRouters);
app.get("/booking/:id", checkAuth, booking);
app.get("/profile/:id", checkAuth, profile);
app.post("/review/:id", checkAuth, rev);
app.get("/about", detail);
app.get("/contactUs", detail);
app.get("/test/:id",idx);
app.post("/createOrder",checkAuth,razorPay);
app.post("/payment/verify",checkAuth,razorPay);
app.get("/bookings/:id",checkAuth,booking);
app.delete("/bookings/cancel/:id",checkAuth,booking);


// =======================
// Error Handling
// =======================


// Page Not Found Middleware
app.use("*", (req, res, next) => {
    const error = new Error("Page Not Found");
    error.status = 404;
    next(error);
});

// Error Handling Middleware
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    res.status(statusCode);

    res.render("error", {
        title: "Error",
        error: {
            message: error.message || "An unexpected error occurred.",
            status: statusCode,
        },
    });

    console.error(`[${statusCode}] ${error.message}`);
});

// =======================
// Database Connection and Server Initialization
// =======================
async function main() {
    try {
        await mongoose.connect(dbUrl);  // Simplified connection without deprecated options
        console.log("Database Connected!");

        app.listen(3000, () => {
            console.log("Server is listening on port 3000...");
        });
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1);  // Exit the process if the connection fails
    }
}

// =======================
// Start Application
// =======================
main();
