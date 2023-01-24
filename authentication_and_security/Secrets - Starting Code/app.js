require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const mongoose = require('mongoose');
// Level 2 using Encryption
var encrypt = require('mongoose-encryption');

// db connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/userDB');

// db schema 
// LEVEL 1 Security using username and password only
const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

// mongoose encryption LEVEL 2 using Encryption
// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, { secret: secret ,encryptedFields: ['password'] })


// user model
const User = new mongoose.model('User',userSchema);




const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.render('home');
});
app.get('/login',function(req,res){
    res.render('login');
});
app.get('/register',function(req,res){
    res.render('register');
});
// register route
app.post('/register',function(req,res){
    // LEVEL 4 Security using Salting and Hashing
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        const newUser = User({
            email:req.body.username,
            // password: md5(req.body.password) // LEVEL 3 Security using hashing algorithm md5
            password:hash
        });
        newUser.save(function(err){
            if (err){
                console.log(err);
            } else {
                res.render('secrets');
            }
        });  
    });

      
});
// login route 
app.post('/login',function(req,res){
    const username = req.body.username;
    // const password = md5(req.body.password);
    const password = req.body.password;
    User.findOne({
        email:username
    },
    function(err, foundUser){
        if (err){
            console.log(err);
        } else{
            if(foundUser){
                // if(foundUser.password === password){
                //     res.render('secrets');
                // }
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result=== true){
                        res.render("secrets");
                    }
                });
            }
        }
    });
});

app.listen(port, function(){
    console.log("Server listening on port 3000");
});
