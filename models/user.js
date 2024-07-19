const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
      name: {type:String, required: true},
      tasks: [{type: Schema.Types.ObjectId, ref: 'task'}],
})

const User = mongoose.model("User", userSchema);
module.exports = User;