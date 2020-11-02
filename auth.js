

function ensureAuth(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg","Login to go to the dashboard")
        res.redirect("/users/login")

    }
    module.exports = ensureAuth;

