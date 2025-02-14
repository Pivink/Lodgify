function checkAuth(req, res, next) {
    try {
        console.log("Checking authentication...");
        if (!req.isAuthenticated()) {
            console.log(req.originalUrl);
            req.session.redirectUrl = req.originalUrl;
            console.log("Req Body: ",req.body);
            if(req.body && !req.session.pendingReview){
                req.session.pendingReview = req.body;
                console.log("Req review: ",req.session);

            }
            req.flash("error", "You must log in first");
            return res.redirect("/signIn"); // Redirect to sign-in
        }
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}

function saveRedirectUrl(req, res, next) {
    try {
        console.log("Save Redirect URL...");
         if (req.session.redirectUrl) {
            res.locals.redirectUrl = req.session.redirectUrl;
        }

        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}



module.exports = {
    checkAuth,
    saveRedirectUrl,
};
