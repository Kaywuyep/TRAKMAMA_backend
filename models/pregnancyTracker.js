const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['baby growth', 'vital signs', 'symptom'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  dateRecorded: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Tracker = mongoose.model('Tracker', trackerSchema);
module.exports = Tracker;