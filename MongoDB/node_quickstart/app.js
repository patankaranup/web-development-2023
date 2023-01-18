const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db("shopDB").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("shopDB");
    const products = database.collection('products');

    // for inserting
    // const doc = { _id:4, name: "Compass", price:5,stock:36 };
    // const result = await products.insertOne(doc);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    // find documents
    const query = {name:"Pen"};
    const findDocuments = await products.findOne(query);
    console.log(findDocuments);


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




