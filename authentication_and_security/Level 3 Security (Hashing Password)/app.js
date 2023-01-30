require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('md5');

// const encrypt = require('mongoose-encryption');

// const secret = process.env.SECRET;



// basic setting up
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


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

// Schema Plugin for encryption
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });


// Schema Model
const User = new mongoose.model("User", userSchema);

app.get('/', function(req,res){
    res.render('home');
});

app.get('/register', function(req,res){
    res.render('register');
});

app.get('/login', function(req,res){
    res.render('login');
});



app.post('/register', function(req,res){
    const username = req.body.username;
    const password = md5(req.body.password);

    const newUser = new User({
        email:username,
        password:password
    });

    newUser.save(function(err){
        if(!err){
            console.log("User added Succesfully");
            res.render('secrets');
        } else {
            console.log(err);
        }
    });

});
app.post('/login', function(req,res){
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email:username}, function(err,foundUser){
        if(err){
            console.log(err);
        } else{
            if(foundUser){
                if(foundUser.password === password){
                    console.log("User logged in Succesfully");
                    res.render('secrets');
                }
            }
        }
    });
});
const port = 3000 || process.env.PORT;
app.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});