const mongoose = require('mongoose');
const {Schema} = mongoose;

const storySchema = new mongoose.Schema({
      title: {type: String, required: true},
      description: {type: String, required: true},
      estimation: {type: Number, required: true},
      totalTime: {type: Number, required: true},
      tasks:[{type: Schema.Types.ObjectId, ref: 'task'}]
})

const Story = mongoose.model("Story", storySchema);
module.exports = Story;