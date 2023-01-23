require('dotenv').config();
// console.log(process.env) // remove this after you've confirmed it is working

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');
const URL = process.env.URL;
const app = express();
const port = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose.connect(URL);

// schema for our listitems
const itemsSchema = new mongoose.Schema(
  {
      // built in validation
      name:{
          type:String,
          required:[true,"Name fields are required"]
      }
  }
);

// model for our schema
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item(
    {
        name:"Welcome to your todo list"
    }
);
const item2 = new Item(
  {
      name:"Hit the + button to add the item"
  }
);
const item3 = new Item(
  {
      name:"<-- Hit this button to delete one"
  }
);

// list schema 
const listSchema = {
  name:String,
  items:[itemsSchema]
};
const List = mongoose.model('List', listSchema);


const defaultItems = [item1,item2,item3];



// using ejs template engine
app.set("view engine", "ejs");

// using body-parser for getting post data
app.use(bodyParser.urlencoded({ extended: true }));

// use public static folder
app.use(express.static("public"));


// root get request
app.get("/", function (req, res) {
  // this will render the ejs file inside the views folder

  Item.find(function(err, items){ // items is the data we get back
    if (err){
        console.log(err);
    } else {
      // populate with default items only at if the items is 0
      if (items.length === 0){
        Item.insertMany(
          defaultItems,
          function(err){
              if (err){
                  console.log(err);
              } else {
                res.redirect('/')
              }
          }
      );
      
      } else {
        res.render("list", { listTitle: "Today", newListItems: items });
      }
    }
});
  
});

// root post request
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item(
    {
        name:itemName
    }
  );

  if (listName ==="Today"){
    item.save();
    res.redirect('/'); 
  } else {
    List.findOne({name:listName},function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }
  
});

// delete post route
app.post('/delete',function(req,res){

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, 
      function(err){
        if (err){
          console.log(err);
        } else {
          // console.log("Deleted");
          res.redirect('/');
        }
      }
    );
  } else {
    List.findOneAndUpdate({
      // which list to find
      name:listName
    },{
      // what to update
      // take array input and the filter condition
      $pull:{items: {_id:checkedItemId}}
    },function(err){
      if(!err){
        res.redirect('/'+listName);
      }
    })

  }
  
});

// for custom route
app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({
    name:customListName
  },
  function(err,foundList){
    if (!err){
      if (!foundList){
        // create a list
        const list = new List({
          name:customListName,
          items: defaultItems
        });
        list.save();
        res.redirect('/'+customListName);
      } else{
        // show existing list 
        res.render('list',{ listTitle: foundList.name, newListItems: foundList.items }); 
      }
    }
  });
  
  
  
});

// for about page route
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
