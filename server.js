// wrTUTy7Dq6aRA6QS
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");

//This is require when database connection url is imported from .env file
require('dotenv').config();

const mongoose = require("mongoose");
const indexRoute = require("./index");
const userRoute = require("./user");

//app config
const app = express();


//ejs middleware
app.use(expressLayouts);
app.set("view engine","ejs");

//expression session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

//flash connection middleware
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();

})

//body parser
app.use(express.urlencoded({extended: false}));

//middlewares
app.use("/", indexRoute);
app.use("/users", userRoute);

//Database
const connection_url = process.env.URL;
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.once("open",()=>{
    console.log("mongodb connected")
})

const port = process.env.PORT || 9000;

//listen
app.listen(port,()=>console.log(`listening to port: ${port}`));
