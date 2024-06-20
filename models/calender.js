const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventTitle: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description must be less than or equal to 500 characters']
  },
  eventType: {
    type: String,
    enum: ['appointment', 'health reminder', 'community meeting'],
    required: true
  }
}, { timestamps: true });

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
module.exports = CalendarEvent;