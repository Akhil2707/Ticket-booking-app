const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    seatNumber: {
      type: Number,
      required: [true, "please select tickets"],
    },
    isBooked: {
      type: Boolean,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

const tickets = mongoose.model("tickets", ticketSchema);
module.exports = tickets;
