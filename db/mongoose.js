const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MONGOURL = process.env.MONGO_URL;
mongoose.connect(MONGOURL);