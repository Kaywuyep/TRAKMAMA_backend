const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  contentType: {
    type: String,
    enum: ['article', 'video', 'pregnancy'],
    required: true
  },
  format: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    trim: true,
    required: function() {
      return this.contentType === 'pregnancy';
    }
  },
  week: {
    type: Number,
    min: 1,
    max: 42,
    required: function() {
      return this.contentType === 'pregnancy';
    }
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const Library = mongoose.model('Library', librarySchema);
module.exports = Library;