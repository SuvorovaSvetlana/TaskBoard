const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
      title: {type: String, required: true},
      author: {type: String, required: true},
      description: {type: String, required: true},
      executor: {type: String},
      type: {type: []},
      staus: {type: [], default: "new"},
      creationDate: { type: Date, default: Date.now },
      changesDate: { type: Date, default: Date.now },
      deadline: { type: Date, default: Date.now },
})
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;