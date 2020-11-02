const express = require("express");
const router = express.Router();

const User = require("./models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

//Login routes
router.get("/login",(req,res)=>res.render("Login"));

//register
router.get("/register",(req,res)=>res.render("Register"));

//Register Handle
router.post("/register",(req,res)=>{
    const {name, email, password, password1, date} = req.body;
    console.log(req.body)
    let errors=[];

    //required fields
    if(!name || !email || !password || !password1){
        errors.push({
            msg: "Please fill in all the fields below"
        })
    }

    if(password!==password1){
        errors.push({
            msg:"password do not match"
        })
    }

    if(password.length<7){
        errors.push({
            msg: "Password must be atleast seven character"
        })
    }

    if(errors.length>0){
        res.render("Register",{
            errors,
            email,
            name,
            password,
            password1
        });


    }
    else {
        User.findOne({email:email})
            .then(user=>{
                if(user){
                    errors.push({msg: "Email and user already exist"})
                    res.render("Register",{
                        errors,
                        email,
                        name,
                        password,
                        password1
                    });
                }
                else{
                    //same this as name:name below, shortcut way to do that
                    const newUser = new User({
                        name,
                        email,
                        password,
                        date: Date.now()
                    })
                   //hash or crypt password
                    bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newUser.password, salt,(err,hash)=>{
                        if(err) throw err;

                        //password set to hash
                            newUser.password= hash;
                        newUser.save()
                            .then(user=>{
                                req.flash("success_msg", "You are register");
                                res.redirect("/users/login")
                            })
                            .catch(error=>res.status(400).json("error: "+ error))
                    }))
                }
            })
    }


});
//Handle Login
router.post("/login",(req,res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//logout
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success_msg","You are now logout");
    res.redirect("/users/login")

})


module.exports = router;
