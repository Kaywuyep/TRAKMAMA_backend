const mongoose = require('mongoose');

const supportGroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Group name must be less than or equal to 100 characters']
  },
  groupType: {
    type: String,
    enum: ['Trimester1', 'Trimester2', 'Trimester3', 'Mothers', 'Custom'],
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description must be less than or equal to 500 characters']
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  posts: [{
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, 'Post content must be less than or equal to 300 characters']
    },
  }]
}, { timestamps: true });

const SupportGroup = mongoose.model('SupportGroup', supportGroupSchema);

module.exports = SupportGroup;