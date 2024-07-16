const mongoose = require('mongoose');

const taskCommentSchema = new mongoose.Schema({
      text:{type: String, required: true},
      author:{type: String, required: true}},
      { timestamps: true }
)

const TaskComment = mongoose.model("TaskComment", taskCommentSchema);
module.exports = TaskComment;