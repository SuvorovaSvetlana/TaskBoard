const express = require('express');
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')
const app = express();
const dotenv = require('dotenv').config();
require('./db/mongoose');

const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(PORT, ()=>{
      console.log(`App is running on ${PORT}`)
})



