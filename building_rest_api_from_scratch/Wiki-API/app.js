const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

// db schema
const articleSchema = new mongoose.Schema({
    title:{
      type:String,
      required:[true,"Title fields are required"]
    },
    content:{
      type:String,
      required:[true,"Content fields are required"]
    }
});

// db model 
const Article = mongoose.model("Article", articleSchema);


// quickstart code
const app = express();
app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
const port = 3000 || process.env.PORT;


// using chainable routes for same path but different request types
// req targeting all articles

app.route('/articles')
.get((req, res) => {
    Article.find(function(err,foundArticles){
        if (!err){
          res.send(foundArticles);
        } else{
            res.send(err);
        }
    });
})
.post(function(req,res){
    const newarticle = new Article({
        title:req.body.title,
        content:req.body.content
    });

    newarticle.save(function(err){
        if(!err){
            res.send("Succesfully added new article");
        } else {
            req.send(err);
        }
    });
    
})
.delete(function(req,res){
    Article.deleteMany(function(err){
        if (!err){
            res.send("Succesfully Deleted all the articles");
        } else{
            res.send(err);
        }
    })
});

// req targeting a specific article
app.route('/articles/:articleTitle')
.get(function(req,res){
    const articleTitle = req.params.articleTitle;
    Article.findOne({title:articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        } else {
            res.send("No articles matching the title was found");
        }
    });
})
.put(function(req,res){
    // put and patch are same now in mongodb
    const articleTitle = req.params.articleTitle;
    Article.updateOne(
        {title:articleTitle},
        {title:req.body.title,content:req.body.content},
        function(err,result){
            if(!err){
                res.send("Successfully Updated a Article");
            }
        }

    );
})
.patch(function(req,res){
    // same as put but a little diff 
    const articleTitle = req.params.articleTitle;
    Article.updateOne(
        {title:articleTitle},
        {title:req.body.title,content:req.body.content},
        function(err,result){
            if(!err){
                res.send("Successfully Updated a Article");
            }
        }
    );
})
.delete(function(req,res){
    const articleTitle = req.params.articleTitle;
    Article.deleteOne(
        {title:articleTitle},
        function(err){
            if(!err){
                res.send("Successfully Deleted a Article");
            } else{
                res.send(err);
            }
        }
    );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})