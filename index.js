const express = require("express");
const router = express.Router();
const ensureAuth = require("./auth");

router.get("/",(req,res)=>res.render("Welcome"));

router.get("/dashboard",ensureAuth,(req,res)=>res.render("dashboard",{
    username: req.user.name
}));

module.exports = router;
