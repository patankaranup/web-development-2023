const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


// fruitsDB is the db
mongoose.connect('mongodb://localhost:27017/fruitsDB');

// schema for our fruits db
const fruitSchema = new mongoose.Schema(
    {
        // built in validation
        name:{
            type:String,
            required:[true,"Name fields are required"]
        },
        rating:{
            type : Number,
            min:1,
            max:10
        },
        review:String
    }
);

// Fruit is the collection (it will pluralize and save it as fruits)
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit(
    {
        name:"Apple",
        rating:1,
        review:"Best Fruit"
    }
);
//save the doc to our db in collection
// fruit.save();

// schema for our peoples db
const personSchema = new mongoose.Schema(
    {
        name:String,
        age:Number,
        favouriteFruit: fruitSchema // establishing relationship
    }
);
// model for our person schema
const Person = mongoose.model("Person", personSchema);

const grapes = new Fruit(
    {
        name:"Grapes",
        rating:9,
        review:"Best Fruit"
    }
);

grapes.save();



const person = new Person(
    {
        name:"Abc",
        age:12,
        favouriteFruit:grapes
    }
);


// writes it to the document
// person.save();


// inserting bulk data 
const kiwi = new Fruit(
    {
        name:"Kiwi",
        rating:10,
        review:"Best Fruit"
    }
);
const orange = new Fruit(
    {
        name:"Orange",
        rating:9,
        review:"Too sour"
    }
);
const banana = new Fruit(
    {
        name:"Banana",
        rating:7,
        review:"Best fruit"
    }
);
// array of objects and callback function

// Fruit.insertMany(
//     [kiwi,orange,banana],
//     function(err){
//         if (err){
//             console.log(err);
//         } else {
//             console.log("Success");
//         }
        
//     }
// );



// reading data from Fruit model 


Fruit.find(function(err, fruits){ // fruits is the data we get back
    if (err){
        console.log(err);
    } else {
        // mongoose.connection.close();
        fruits.forEach(fruit => {
            console.log(fruit.name);
            
        }); 
    }
});

// Updating 

Person.updateOne(
    {   
        // where to update  
        name:"John",
    },
    {
        // what to update 
        favouriteFruit:grapes
    },
    function(err){
        if (err){
            console.log(err);
        } else {
            console.log("Successfully Updated");
            // mongoose.connection.close();
        }   
    }
);

// deleting 

// Fruit.deleteOne(
//     {
//         name:"Banana"
//     },
//     function(err){
//         if (err){
//             console.log(err);
//         } else {
//             console.log("Deleted");
//         }
//     }
// );

// Person.deleteMany(
//     {
//         name:"John"
//     },
//     function(err){
//         if (err){
//             console.log(err);
//         } else {
//             console.log("Deleted succesfully");
//         }
//     }
// )

