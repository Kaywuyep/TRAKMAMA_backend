const mongoose = require("mongoose");
// Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

const paymentSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentPlan: [
      {
        type: Object,
        required: true,
      },
    ],
    paymentNumber: {
      type: String,
      default: randomTxt + randomNumbers,
    },
    paymentStatus: {
      type: String,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "Not specified",
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: "Not specified",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "paid"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compile to form model
const Payment = mongoose.model("Payments", paymentSchema);

module.exports = Payment;