const mongoose = require('mongoose');
const {Schema} = mongoose;


const trackedTimeSchema = new mongoose.Schema({
      user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
      task: {type: Schema.Types.ObjectId, ref: 'task', required: true},
      time: {type: Number, required: true}
})

const TrackedTime = mongoose.model('TrackedTime', trackedTimeSchema);
module.exports = TrackedTime;