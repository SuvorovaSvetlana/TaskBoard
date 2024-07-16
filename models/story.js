const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
      titel: {type: String, required: true},
      description: {type: String, required: true},
      estimation: {type: Number, required: true},
      totalTime: {type: Number, required: true},
})

const Story = mongoose.model("Story", storySchema);
module.exports = Story;