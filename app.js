const express = require('express');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
const taskCommentRouter =require('./routers/taskComments');
const storyRouter = require('./routers/stories');
const trackedTimeRouter = require('./routers/trackedTimes')
const app = express();
const dotenv = require('dotenv').config();
require('./db/mongoose');

const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(taskCommentRouter);
app.use(storyRouter);
app.use(trackedTimeRouter);

app.listen(PORT, ()=>{
      console.log(`App is running on ${PORT}`)
})



