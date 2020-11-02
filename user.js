const express = require("express");
const router = express.Router();

//Login routes
router.get("/login",(req,res)=>res.render("Login"));

//register
router.get("/register",(req,res)=>res.render("Register"));

//Register Handle
router.post("/register",(req,res)=>{
    const {name, email, password, password1} = req.body;
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
        res.send("pass");
    }


})


module.exports = router;
