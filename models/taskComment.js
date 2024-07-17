const mongoose = require('mongoose');
const {Schema} = mongoose;

const taskCommentSchema = new mongoose.Schema({
      text:{type: String, required: true},
     _author:{type: Schema.Types.ObjectId, ref: "User"}},
      { timestamps: true }
)

const TaskComment = mongoose.model("TaskComment", taskCommentSchema);
module.exports = TaskComment;