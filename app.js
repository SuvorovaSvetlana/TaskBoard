const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(()=> console.log('connected'))

app.get('/', (req, res) => { 
      res.send('Hello ...')
})
app.listen(PORT, ()=>{
      console.log(`App is running on ${PORT}`)
})