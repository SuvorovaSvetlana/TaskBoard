const mongoose = require('mongoose');
const { Schema } = mongoose;
 
const taskSchema = new mongoose.Schema({
      title: {type: String, required: true},
      description: {type: String, required: true},
      type: {type: String, enum: ['estimation', 'development', 'testing', 'debugging']},
      status: {type: String, enum: ['todo', 'doing', 'for approval', 'reopend', 'done']},
      executor: [{type: Schema.Types.ObjectId, ref: "User"}],
      trackedTime: [{type: Schema.Types.ObjectId, ref:'trackedTime'}],
      story: {type: Schema.Types.ObjectId, ref:'story'},
      deadline: { type: Date, default: Date.now()}}, 
      { timestamps: true }
)

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;