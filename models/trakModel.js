// schema for tracking pregnancy
const mongoose = require('mongoose');
//const User = require("./usermodel")

const trakmamaSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    // required: [true, 'Due date is required']
  },

  lastMenstrualPeriod: {
    type: Date,
    required: [true, 'Last menstrual period date is required']
  },

  currentWeek: {
    type: Number,
    required: [true, 'Current week of pregnancy is required'],
    min: [1, 'Current week must be greater than or equal to 1'],
    max: [42, 'Current week must be less than or equal to 42']
  },

  weightGain: {
    type: Number,
    required: [true, 'Weight gain is required'],
    min: [0, 'Weight gain must be greater than or equal to 0']
  },

  symptoms: {
    type: [String],
    required: true,
    default: []
  },

  appointments: [{
    date: {
      type: Date,
      required: [true, 'Appointment date is required']
    },
    notes: {
      type: String,
      trim: true,
      minlength: [10, 'Notes must be less than or equal to 500 characters']
    }
  }],

});

trakmamaSchema.pre('save', function (next) {
  if (!this.dueDate) {
    this.dueDate = new Date(this.lastMenstrualPeriod);
    this.dueDate.setDate(this.dueDate.getDate() + 280); // Adding 280 days to LMP to calculate the due date
  }
  next();
});

const Trakmama = mongoose.model('Trakmama', trakmamaSchema);

module.exports = Trakmama;