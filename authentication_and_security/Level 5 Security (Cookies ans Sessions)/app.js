require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// const LocalStrategy = require('passport-local').Strategy;

const secret = process.env.SECRET;


// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// const encrypt = require('mongoose-encryption');

// const secret = process.env.SECRET;



// basic setting up
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// express session
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


// Database Connection
mongoose.set({'strictQuery':false});
mongoose.connect("mongodb://127.0.0.1:27017/userDB", function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected Database");
    }  
});

// Mongoose Database Schema
const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

userSchema.plugin(passportLocalMongoose);

// Schema Plugin for encryption
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

// Schema Model
const User = new mongoose.model("User", userSchema);

// strategy for session 
passport.use(User.createStrategy());
// for cookies and session 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/', function(req,res){
    res.render('home');
});

app.get('/register', function(req,res){
    res.render('register');
});

app.get('/login', function(req,res){
    res.render('login');
});

app.get('/secrets', function(req,res){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        res.render('secrets');
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', function(req,res){
    req.logout(function(err){
        if (err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
    
});


app.post('/register', function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    // passport local mongoose handles every thing like creating the db 
    User.register({username:username, active: false}, password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secrets');
            });
        } 
    });
});


app.post('/login', function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const user = new User({
        username:username,
        password:password
    });

    req.login(user, function(err){
        if (err){
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/secrets');
            });
        }
    })
    

});



const port = 3000 || process.env.PORT;
app.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});