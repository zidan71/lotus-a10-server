const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// muhaimin
// CwQEyq0lxrOj8jg5


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://muhaimin:CwQEyq0lxrOj8jg5@cluster0.ytuhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


    const userCollection = client.db('userCollect').collection('users')

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    app.get('/users', async (req,res)=> {
        const user = userCollection.find()
        const result = await user.toArray()
        res.send(result)
    })


    app.get('/users/:id', async(req,res)=> {
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await userCollection.findOne(query);
        res.send(result)
    })

    app.post('/users', async(req,res)=> {
        const user = req.body;
        const result = await userCollection.insertOne(user)
        res.send(result)
    })






    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req,res)=> {
    res.send('Lotus website loading')
})

app.listen(port, ()=> {
    console.log(`Lotus website loading on ${port}`)
})