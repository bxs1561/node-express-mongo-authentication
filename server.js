// wrTUTy7Dq6aRA6QS
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

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
