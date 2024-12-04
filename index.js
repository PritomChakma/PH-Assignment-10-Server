const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// proGammer
// Vn4Zv4mt9h0QwtqY

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nzorc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const gameReview = client.db("gameReview").collection("review")

app.get("/allReview", async(req, res) => {
  const cursor = gameReview.find()
  const result = await cursor.toArray()
  res.send(result)
})
app.get("/myReview", async(req, res) => {
  const {email} = req.query
  const allReview = await gameReview.find().toArray()
  const myReview = allReview.filter(i => i.email === email)
  res.send(myReview)
})


    app.post("/allReview", async(req, res) => {
      const review = req.body;
      console.log(review);
      const result = await gameReview.insertOne(review)
      res.send(result)
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("The surver iss running on way");
});
app.listen(port, () => {
  console.log(`the surver is running port on: ${port}`);
});
