const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
      title: {type: String, required: true},
      author: {type: String, required: true},
      description: {type: String, required: true},
      executor: {type: String},
      type: {type: []},
      status: {type: [], default: "new"},
      deadline: { type: Date, default: Date.now()}}, 
      { timestamps: true }
)

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;