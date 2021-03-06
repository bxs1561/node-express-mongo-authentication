const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

//user models
const User = require("./models/User");

//Documentation of passport authentication
// http://www.passportjs.org/docs/

function password(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=> {
        User.findOne({email:email})
            .then(user=>{
                if(!user){
                    return done(null,false,{
                        message: `${email} is not register`
                    })
                }

                //Password march
                bcrypt.compare(password,user.password, (err,isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user)
                    }
                    else {
                        return  done(null, false,{
                            message: "Password is incorrect"
                        })
                    }
                });

            }).catch(error=>console.log(error))
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


}
module.exports = password;
