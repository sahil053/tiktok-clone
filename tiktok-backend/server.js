import express from "express";
import mongoose from 'mongoose';
import Data from './data.js';
import Videos from './dbModel.js';

const connection_url = 'mongodb+srv://sahilsinghiscool:sahilsinghcool@cluster0.dwr53zq.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url,{
    useNewURLParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next();
});

//DB config


//api endpoints
app.get("/", (req,res ) => res.status(200).send('hello world'));

app.get('/v1/posts', (req, res) => res.status(200).send(Data));


app.get('/v2/posts', async (req, res) => {
  try {
    // Use async/await to handle promises
    const data = await Videos.find().exec();
    
    res.status(200).send(data);
  } catch (err) {
    // Handle any errors that occurred during the find operation
    res.status(500).send(err);
  }
});


app.post('/v2/posts', async (req, res) => {
  try {
    const dbVideos = req.body;

    // Use async/await to handle promises
    const data = await Videos.create(dbVideos);
    
    res.status(201).send(data);
  } catch (err) {
    // Handle any errors that occurred during the creation
    res.status(500).send(err);
  }
});


//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));






